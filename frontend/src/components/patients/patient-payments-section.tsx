'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreditCard, Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/services/api';

interface PaymentItem {
  id: number;
  patient_id: number;
  total_amount: number;
  paid: number;
  remaining: number;
  date?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface PatientPaymentsSectionProps {
  patientId: string;
}

interface PaymentFormState {
  patient_id: string;
  total_amount: string;
  paid: string;
  remaining: string;
  date: string;
}

const defaultFormValues: PaymentFormState = {
  patient_id: '',
  total_amount: '',
  paid: '',
  remaining: '',
  date: '',
};

export function PatientPaymentsSection({
  patientId,
}: PatientPaymentsSectionProps) {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<PaymentFormState>({
    ...defaultFormValues,
    patient_id: patientId,
  });

  const { data: payments = [], isLoading } = useQuery<PaymentItem[]>({
    queryKey: ['payments', patientId],
    queryFn: () => api.getPayments(patientId),
    enabled: !!patientId,
  });

  const createMutation = useMutation({
    mutationFn: (values: PaymentFormState) =>
      api.createPayment({
        patient_id: values.patient_id,
        total_amount: values.total_amount,
        paid: values.paid,
        remaining: values.remaining,
        date: values.date,
      }),
    onSuccess: () => {
      toast.success('تمت إضافة الدفعة بنجاح');
      queryClient.invalidateQueries({ queryKey: ['payments', patientId] });
      setForm({
        ...defaultFormValues,
        patient_id: patientId,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر إضافة الدفعة');
    },
  });

  const summary = useMemo(() => {
    return payments.reduce(
      (acc, payment) => {
        acc.total += Number(payment.total_amount) || 0;
        acc.paid += Number(payment.paid) || 0;
        acc.remaining += Number(payment.remaining) || 0;
        return acc;
      },
      { total: 0, paid: 0, remaining: 0 }
    );
  }, [payments]);

  function handleChange(field: keyof PaymentFormState, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      const total = Number(next.total_amount) || 0;
      const paid = Number(next.paid) || 0;

      if (field === 'total_amount' || field === 'paid') {
        const remaining = total - paid;
        next.remaining = remaining >= 0 ? String(remaining) : '0';
      }

      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.total_amount || !form.paid) {
      toast.error('المبلغ الكلي والمدفوع مطلوبان');
      return;
    }

    if (Number(form.paid) > Number(form.total_amount)) {
      toast.error('المدفوع لا يمكن أن يكون أكبر من المبلغ الكلي');
      return;
    }

    createMutation.mutate({
      ...form,
      patient_id: patientId,
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b6954] text-white shadow-md">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#00150f]">إضافة دفعة جديدة</h3>
            <p className="text-sm text-[#717975]">
              سجلي دفعة جديدة لهذا المريض مع تفاصيل المبلغ.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              المبلغ الكلي
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.total_amount}
              onChange={(e) => handleChange('total_amount', e.target.value)}
              placeholder="أدخل المبلغ الكلي"
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              المدفوع
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.paid}
              onChange={(e) => handleChange('paid', e.target.value)}
              placeholder="أدخل المبلغ المدفوع"
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              المتبقي
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.remaining}
              readOnly
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-slate-100 px-4 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600">
              التاريخ
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="h-12 w-full rounded-xl border border-[#e3e2e0] bg-white px-4 text-sm outline-none transition focus:border-cyan-400"
            />
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="h-12 rounded-xl bg-[#00150f] px-6 text-white hover:bg-[#2b6954]"
            >
              إضافة الدفعة
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
          <p className="text-sm font-medium text-[#717975]">إجمالي المبالغ</p>
          <p className="mt-2 text-2xl font-extrabold text-[#00150f]">
            {summary.total}
          </p>
        </div>

        <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
          <p className="text-sm font-medium text-[#717975]">إجمالي المدفوع</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">
            {summary.paid}
          </p>
        </div>

        <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
          <p className="text-sm font-medium text-[#717975]">إجمالي المتبقي</p>
          <p className="mt-2 text-2xl font-extrabold text-amber-600">
            {summary.remaining}
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2b6954] text-white shadow-md">
            <Wallet className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#00150f]">قائمة المدفوعات</h3>
            <p className="text-sm text-[#717975]">
              جميع المدفوعات المسجلة لهذا المريض.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-[#717975]">
            جاري تحميل المدفوعات...
          </div>
        ) : payments.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-[#717975]">
            لا توجد مدفوعات لهذا المريض حتى الآن.
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-xl border border-[#e3e2e0] bg-white p-4 shadow-sm"
              >
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs text-[#717975]">المبلغ الكلي</p>
                    <p className="mt-1 text-base font-bold text-[#00150f]">
                      {payment.total_amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#717975]">المدفوع</p>
                    <p className="mt-1 text-base font-bold text-emerald-600">
                      {payment.paid}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#717975]">المتبقي</p>
                    <p className="mt-1 text-base font-bold text-amber-600">
                      {payment.remaining}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#717975]">التاريخ</p>
                    <p className="mt-1 text-base font-bold text-[#00150f]">
                      {payment.date || '-'}
                    </p>
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