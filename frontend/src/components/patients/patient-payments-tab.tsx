'use client';

import { Edit, Eye, Trash2, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';

interface PatientsTableProps {
  patients: Patient[];
  isLoading?: boolean;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export function PatientsTable({
  patients,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}: PatientsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-10 text-center text-[#717975] shadow-sm">
        جاري تحميل المرضى...
      </div>
    );
  }

  if (!patients.length) {
    return (
      <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-[#2b6954] text-white shadow-sm">
          <Users className="h-7 w-7" />
        </div>

        <h3 className="mt-4 text-xl font-bold text-[#00150f]">
          لا يوجد مرضى حاليًا
        </h3>

        <p className="mt-2 text-sm leading-7 text-[#717975]">
          ابدأ بإضافة أول مريض داخل النظام، وسيظهر هنا في القائمة.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="hidden grid-cols-6 rounded-xl bg-[#faf9f7] px-4 py-3 text-sm font-semibold text-slate-600 md:grid">
        <div className="text-right">الاسم</div>
        <div className="text-right">رقم الهاتف</div>
        <div className="text-right">العمر</div>
        <div className="text-right">الوظيفة</div>
        <div className="text-right">العنوان</div>
        <div className="text-right">الإجراءات</div>
      </div>

      <div className="space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-4 shadow-sm transition hover:shadow-md md:p-5"
          >
            <div className="grid gap-4 md:grid-cols-6 md:items-center">
              <div>
                <p className="text-xs text-[#717975] md:hidden">الاسم</p>
                <p className="text-base font-bold text-[#00150f]">
                  {patient.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#717975] md:hidden">رقم الهاتف</p>
                <p className="text-sm font-medium text-slate-600">
                  {patient.phone || '-'}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#717975] md:hidden">العمر</p>
                <p className="text-sm font-medium text-slate-600">
                  {patient.age || '-'}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#717975] md:hidden">الوظيفة</p>
                <p className="text-sm font-medium text-slate-600">
                  {patient.job_title || '-'}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#717975] md:hidden">العنوان</p>
                <p className="line-clamp-2 text-sm font-medium text-slate-600">
                  {patient.address || '-'}
                </p>
              </div>

              <div className="flex flex-wrap justify-start gap-2 md:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(patient)}
                  className="rounded-xl border-cyan-200 bg-cyan-50 text-[#2b6954] hover:bg-cyan-100"
                >
                  <Eye className="ml-1 h-4 w-4" />
                  عرض
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(patient)}
                  className="rounded-xl border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                >
                  <Edit className="ml-1 h-4 w-4" />
                  تعديل
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(patient)}
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
    </div>
  );
}