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
      <div className="p-10 text-center text-[#717975] text-sm font-medium">
        جاري تحميل المرضى...
      </div>
    );
  }

  if (!patients.length) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#faf9f7] text-[#717975] mb-4">
          <Users className="h-7 w-7" />
        </div>
        <h3 className="text-base font-bold text-[#00150f]">لا يوجد مرضى حاليًا</h3>
        <p className="mt-1 text-sm text-[#717975]">ابدأ بإضافة أول مريض داخل النظام، وسيظهر هنا في القائمة.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="border-b border-[#e3e2e0] bg-[#faf9f7]">
            <th className="py-4 px-6 font-bold text-[#717975] text-xs">الاسم</th>
            <th className="py-4 px-6 font-bold text-[#717975] text-xs">رقم الهاتف</th>
            <th className="py-4 px-6 font-bold text-[#717975] text-xs">العمر</th>
            <th className="py-4 px-6 font-bold text-[#717975] text-xs">الوظيفة</th>
            <th className="py-4 px-6 font-bold text-[#717975] text-xs">العنوان</th>
            <th className="py-4 px-6 font-bold text-[#717975] text-xs text-left">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e3e2e0]">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-[#faf9f7] transition-colors">
              <td className="py-4 px-6 font-medium text-[#00150f]">{patient.name}</td>
              <td className="py-4 px-6 font-medium text-[#717975]" dir="ltr">{patient.phone}</td>
              <td className="py-4 px-6 font-medium text-[#717975]">{patient.age || '-'}</td>
              <td className="py-4 px-6 font-medium text-[#717975]">{patient.job_title || '-'}</td>
              <td className="py-4 px-6 font-medium text-[#717975] max-w-[200px] truncate">{patient.address || '-'}</td>
              <td className="py-4 px-6 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(patient)}
                  className="h-8 rounded-lg text-[#2b6954] hover:text-[#00150f] hover:bg-[#adedd3] font-bold text-xs px-3"
                >
                  <Eye className="ml-1.5 h-3.5 w-3.5" />
                  عرض
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(patient)}
                  className="h-8 rounded-lg text-[#717975] hover:text-[#00150f] hover:bg-[#e3e2e0] font-bold text-xs px-3"
                >
                  <Edit className="ml-1.5 h-3.5 w-3.5" />
                  تعديل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(patient)}
                  className="h-8 rounded-lg text-red-600 hover:text-white hover:bg-red-600 font-bold text-xs px-3"
                >
                  <Trash2 className="ml-1.5 h-3.5 w-3.5" />
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}