'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stethoscope } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Patient } from '@/types/patient';

interface PatientTreatmentPlanTabProps {
  patient: Patient;
}

interface TreatmentPlanFormValues {
  treatment_diagnosis: string;
  treatment_type: string;
  treatment_sessions: string;
  treatment_status: string;
  treatment_notes: string;
}

export function PatientTreatmentPlanTab({
  patient,
}: PatientTreatmentPlanTabProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<TreatmentPlanFormValues>({
    treatment_diagnosis: patient.treatment_diagnosis || '',
    treatment_type: patient.treatment_type || '',
    treatment_sessions: patient.treatment_sessions?.toString() || '',
    treatment_status: patient.treatment_status || '',
    treatment_notes: patient.treatment_notes || '',
  });

  useEffect(() => {
    setForm({
      treatment_diagnosis: patient.treatment_diagnosis || '',
      treatment_type: patient.treatment_type || '',
      treatment_sessions: patient.treatment_sessions?.toString() || '',
      treatment_status: patient.treatment_status || '',
      treatment_notes: patient.treatment_notes || '',
    });
  }, [patient]);

  const updateMutation = useMutation({
    mutationFn: async (values: TreatmentPlanFormValues) => {
      return api.updatePatient(patient.id, {
        name: patient.name,
        phone: patient.phone || '',
        address: patient.address || '',
        job_title: patient.job_title || '',
        age: patient.age?.toString() || '',

        last_visit_date: patient.last_visit_date || '',
        patient_status: patient.patient_status || '',
        follow_up_notes: patient.follow_up_notes || '',
        next_follow_up_date: patient.next_follow_up_date || '',

        medical_history: patient.medical_history || '',
        allergies: patient.allergies || '',
        chronic_diseases: patient.chronic_diseases || '',
        current_medications: patient.current_medications || '',

        treatment_diagnosis: values.treatment_diagnosis,
        treatment_type: values.treatment_type,
        treatment_sessions: values.treatment_sessions,
        treatment_status: values.treatment_status,
        treatment_notes: values.treatment_notes,
      });
    },
    onSuccess: () => {
      toast.success('تم حفظ خطة العلاج بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patient', patient.id] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر حفظ خطة العلاج');
    },
  });

  function handleChange(field: keyof TreatmentPlanFormValues, value: string) {
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
      <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-md">
            <Stethoscope className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">خطة العلاج</h3>
            <p className="text-sm text-slate-500">
              حدّث التشخيص ونوع العلاج وعدد الجلسات والحالة الحالية وملاحظات
              الطبيب.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              التشخيص
            </label>
            <textarea
              value={form.treatment_diagnosis}
              onChange={(e) =>
                handleChange('treatment_diagnosis', e.target.value)
              }
              placeholder="أدخل التشخيص"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              نوع العلاج
            </label>
            <input
              type="text"
              value={form.treatment_type}
              onChange={(e) => handleChange('treatment_type', e.target.value)}
              placeholder="أدخل نوع العلاج"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              عدد الجلسات
            </label>
            <input
              type="number"
              min="0"
              value={form.treatment_sessions}
              onChange={(e) =>
                handleChange('treatment_sessions', e.target.value)
              }
              placeholder="أدخل عدد الجلسات"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              الحالة الحالية
            </label>
            <input
              type="text"
              value={form.treatment_status}
              onChange={(e) => handleChange('treatment_status', e.target.value)}
              placeholder="مثال: جاري العلاج / مكتمل / مؤجل"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              ملاحظات الطبيب
            </label>
            <textarea
              value={form.treatment_notes}
              onChange={(e) => handleChange('treatment_notes', e.target.value)}
              placeholder="أدخل ملاحظات الطبيب"
              className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-6 text-white hover:from-cyan-600 hover:to-sky-700"
            >
              حفظ خطة العلاج
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}