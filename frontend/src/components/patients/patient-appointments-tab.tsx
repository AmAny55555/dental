'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CalendarDays, CheckCircle2, Clock3, Trash2, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Appointment, AppointmentFormValues } from '@/types/appointment';

interface PatientAppointmentsTabProps {
  patientId: string;
}

const defaultFormValues: AppointmentFormValues = {
  patient_id: '',
  date: '',
  time: '',
  status: 'pending',
  notes: '',
};

export function PatientAppointmentsTab({
  patientId,
}: PatientAppointmentsTabProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<AppointmentFormValues>({
    ...defaultFormValues,
    patient_id: patientId,
  });
const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
  queryKey: ['appointments', patientId],
  queryFn: async () => {
    console.log('🔥 patientId:', patientId);
    return api.getAppointments(patientId);
  },
  enabled: !!patientId,
});

  const createMutation = useMutation({
    mutationFn: (values: AppointmentFormValues) => api.createAppointment(values),
    onSuccess: () => {
      toast.success('تمت إضافة الموعد بنجاح');
      queryClient.invalidateQueries({ queryKey: ['appointments', patientId] });
      setForm({
        ...defaultFormValues,
        patient_id: patientId,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر إضافة الموعد');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteAppointment(id),
    onSuccess: () => {
      toast.success('تم حذف الموعد بنجاح');
      queryClient.invalidateQueries({ queryKey: ['appointments', patientId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر حذف الموعد');
    },
  });

  function handleChange(field: keyof AppointmentFormValues, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.date || !form.time) {
      toast.error('التاريخ والوقت مطلوبان');
      return;
    }

    createMutation.mutate({
      ...form,
      patient_id: patientId,
    });
  }

  async function handleDelete(appointment: Appointment) {
    const result = await Swal.fire({
      title: 'تأكيد الحذف',
      text: 'هل أنت متأكد من حذف هذا الموعد؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(appointment.id);
    }
  }

  function getStatusLabel(status: Appointment['status']) {
    if (status === 'done') return 'تم';
    if (status === 'cancelled') return 'ملغي';
    return 'معلق';
  }

  function getStatusIcon(status: Appointment['status']) {
    if (status === 'done') return <CheckCircle2 className="h-4 w-4" />;
    if (status === 'cancelled') return <XCircle className="h-4 w-4" />;
    return <Clock3 className="h-4 w-4" />;
  }

  function getStatusClasses(status: Appointment['status']) {
    if (status === 'done') {
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    }

    if (status === 'cancelled') {
      return 'border-red-200 bg-red-50 text-red-600';
    }

    return 'border-amber-200 bg-amber-50 text-amber-700';
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-md">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">إضافة موعد جديد</h3>
            <p className="text-sm text-slate-500">
              أضف موعدًا جديدًا لهذا المريض بسهولة.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">التاريخ</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">الوقت</label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">الحالة</label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange('status', e.target.value as Appointment['status'])
              }
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            >
              <option value="pending">معلق</option>
              <option value="done">تم</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          <div className="space-y-2 xl:col-span-1">
            <label className="text-sm font-medium text-slate-600">ملاحظات</label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="أدخل ملاحظات الموعد"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-6 text-white hover:from-cyan-600 hover:to-sky-700"
            >
              إضافة الموعد
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">قائمة المواعيد</h3>
          <p className="text-sm text-slate-500">
            جميع مواعيد المريض الحالية والسابقة.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
            جاري تحميل المواعيد...
          </div>
        ) : appointments.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
            لا توجد مواعيد لهذا المريض حتى الآن.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {appointment.date}
                      </span>

                      <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {appointment.time}
                      </span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-sm font-medium ${getStatusClasses(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>

                    <p className="text-sm leading-7 text-slate-500">
                      {appointment.notes || 'لا توجد ملاحظات'}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(appointment)}
                      className="rounded-xl border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="ml-1 h-4 w-4" />
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}