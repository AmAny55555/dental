'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Patient, PatientFormValues } from '@/types/patient';

interface PatientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: Patient | null;
  isSubmitting?: boolean;
  onSubmit: (values: PatientFormValues) => void;
}

const defaultValues: PatientFormValues = {
  name: '',
  phone: '',
  address: '',
  job_title: '',
  age: '',
};

export function PatientFormDialog({
  open,
  onOpenChange,
  patient,
  isSubmitting = false,
  onSubmit,
}: PatientFormDialogProps) {
  const initialValues = useMemo<PatientFormValues>(() => {
    if (!patient) return defaultValues;

    return {
      name: patient.name || '',
      phone: patient.phone || '',
      address: patient.address || '',
      job_title: patient.job_title || '',
      age: patient.age?.toString() || '',
    };
  }, [patient]);

  const [form, setForm] = useState<PatientFormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof PatientFormValues, string>>
  >({});

  useEffect(() => {
    if (open) {
      setForm(initialValues);
      setErrors({});
    }
  }, [initialValues, open]);

  const isEditMode = Boolean(patient);

  function handleChange(field: keyof PatientFormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof PatientFormValues, string>> = {};

    if (!form.name.trim()) nextErrors.name = 'الاسم مطلوب';
    if (!form.phone.trim()) nextErrors.phone = 'رقم الهاتف مطلوب';
    if (form.age && Number(form.age) < 0) nextErrors.age = 'العمر غير صحيح';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] rounded-[28px] border border-white/60 bg-white/95 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-right text-2xl font-extrabold text-slate-800">
            {isEditMode ? 'تعديل بيانات المريض' : 'إضافة مريض جديد'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المريض</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="أدخل اسم المريض"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50"
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="أدخل رقم الهاتف"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50"
              />
              {errors.phone ? (
                <p className="text-sm text-destructive">{errors.phone}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">العمر</Label>
              <Input
                id="age"
                type="number"
                value={form.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="أدخل العمر"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50"
              />
              {errors.age ? (
                <p className="text-sm text-destructive">{errors.age}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_title">الوظيفة</Label>
              <Input
                id="job_title"
                value={form.job_title}
                onChange={(e) => handleChange('job_title', e.target.value)}
                placeholder="أدخل الوظيفة"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">العنوان</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="أدخل العنوان"
              className="h-12 rounded-2xl border-slate-200 bg-slate-50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="rounded-2xl"
            >
              إلغاء
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 text-white hover:from-cyan-600 hover:to-sky-700"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEditMode ? 'حفظ التعديلات' : 'إضافة المريض'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}