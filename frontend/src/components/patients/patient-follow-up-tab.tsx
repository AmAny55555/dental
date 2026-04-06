'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Patient } from '@/types/patient';

interface PatientFollowUpTabProps {
  patient: Patient;
}

interface FollowUpFormValues {
  last_visit_date: string;
  patient_status: string;
  follow_up_notes: string;
  next_follow_up_date: string;
}

export function PatientFollowUpTab({ patient }: PatientFollowUpTabProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<FollowUpFormValues>({
    last_visit_date: patient.last_visit_date || '',
    patient_status: patient.patient_status || '',
    follow_up_notes: patient.follow_up_notes || '',
    next_follow_up_date: patient.next_follow_up_date || '',
  });

  useEffect(() => {
    setForm({
      last_visit_date: patient.last_visit_date || '',
      patient_status: patient.patient_status || '',
      follow_up_notes: patient.follow_up_notes || '',
      next_follow_up_date: patient.next_follow_up_date || '',
    });
  }, [patient]);

  const updateMutation = useMutation({
    mutationFn: async (values: FollowUpFormValues) => {
      return api.updatePatient(patient.id, {
        name: patient.name ?? '',
        phone: patient.phone ?? '',
        address: patient.address || '',
        job_title: patient.job_title || '',
        age: patient.age?.toString() || '',
        last_visit_date: values.last_visit_date,
        patient_status: values.patient_status,
        follow_up_notes: values.follow_up_notes,
        next_follow_up_date: values.next_follow_up_date,
      });
    },
    onSuccess: () => {
      toast.success('تم حفظ بيانات المتابعة بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patient', String(patient.id)] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر حفظ بيانات المتابعة');
    },
  });

  function handleChange(field: keyof FollowUpFormValues, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate(form);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b6954] text-white shadow-md">
            <ClipboardCheck className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#00150f]">بيانات المتابعة</h3>
            <p className="text-sm text-[#717975]">
              حدّث حالة المريض وآخر زيارة وموعد المتابعة القادم.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              تاريخ آخر زيارة
            </label>
            <input
              type="date"
              value={form.last_visit_date}
              onChange={(e) => handleChange('last_visit_date', e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              حالة المريض
            </label>
            <input
              type="text"
              value={form.patient_status}
              onChange={(e) => handleChange('patient_status', e.target.value)}
              placeholder="مثال: يحتاج متابعة / مستقر / تحت العلاج"
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              ملاحظات المتابعة
            </label>
            <textarea
              value={form.follow_up_notes}
              onChange={(e) => handleChange('follow_up_notes', e.target.value)}
              placeholder="أدخل ملاحظات المتابعة"
              className="min-h-[140px] w-full rounded-xl border border-[#e3e2e0] bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              موعد المتابعة القادم
            </label>
            <input
              type="date"
              value={form.next_follow_up_date}
              onChange={(e) =>
                handleChange('next_follow_up_date', e.target.value)
              }
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="h-12 rounded-xl bg-[#00150f] px-6 text-white hover:bg-[#2b6954]"
            >
              حفظ بيانات المتابعة
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}