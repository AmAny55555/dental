'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Patient } from '@/types/patient';

interface PatientMedicalHistoryTabProps {
  patient: Patient;
}

interface MedicalHistoryFormValues {
  medical_history: string;
  allergies: string;
  chronic_diseases: string;
  current_medications: string;
}

export function PatientMedicalHistoryTab({
  patient,
}: PatientMedicalHistoryTabProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<MedicalHistoryFormValues>({
    medical_history: patient.medical_history || '',
    allergies: patient.allergies || '',
    chronic_diseases: patient.chronic_diseases || '',
    current_medications: patient.current_medications || '',
  });

  useEffect(() => {
    setForm({
      medical_history: patient.medical_history || '',
      allergies: patient.allergies || '',
      chronic_diseases: patient.chronic_diseases || '',
      current_medications: patient.current_medications || '',
    });
  }, [patient]);

  const updateMutation = useMutation({
    mutationFn: async (values: MedicalHistoryFormValues) => {
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

        medical_history: values.medical_history,
        allergies: values.allergies,
        chronic_diseases: values.chronic_diseases,
        current_medications: values.current_medications,

        treatment_diagnosis: patient.treatment_diagnosis || '',
        treatment_type: patient.treatment_type || '',
        treatment_sessions: patient.treatment_sessions?.toString() || '',
        treatment_status: patient.treatment_status || '',
        treatment_notes: patient.treatment_notes || '',
      });
    },
    onSuccess: () => {
      toast.success('تم حفظ التاريخ الطبي بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patient', patient.id] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر حفظ التاريخ الطبي');
    },
  });

  function handleChange(field: keyof MedicalHistoryFormValues, value: string) {
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
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">التاريخ الطبي</h3>
            <p className="text-sm text-slate-500">
              حدّث التاريخ الطبي والحساسية والأمراض المزمنة والأدوية الحالية.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              التاريخ الطبي
            </label>
            <textarea
              value={form.medical_history}
              onChange={(e) => handleChange('medical_history', e.target.value)}
              placeholder="أدخل التاريخ الطبي"
              className="min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              الحساسية
            </label>
            <textarea
              value={form.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder="أدخل أي حساسية معروفة"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              الأمراض المزمنة
            </label>
            <textarea
              value={form.chronic_diseases}
              onChange={(e) =>
                handleChange('chronic_diseases', e.target.value)
              }
              placeholder="أدخل الأمراض المزمنة"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-600">
              الأدوية الحالية
            </label>
            <textarea
              value={form.current_medications}
              onChange={(e) =>
                handleChange('current_medications', e.target.value)
              }
              placeholder="أدخل الأدوية الحالية"
              className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-6 text-white hover:from-cyan-600 hover:to-sky-700"
            >
              حفظ التاريخ الطبي
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}