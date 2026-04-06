'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Users } from 'lucide-react';

import { PatientFormDialog } from '@/components/patients/patient-form-dialog';
import { PatientsTable } from '@/components/patients/patients-table';
import { PatientsToolbar } from '@/components/patients/patients-toolbar';
import { api } from '@/services/api';
import { Patient, PatientFormValues } from '@/types/patient';

export function PatientsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search]);

  const { data: patients = [], isLoading } = useQuery<Patient[]>({
    queryKey: ['patients', debouncedSearch],
    queryFn: () => api.getPatients(debouncedSearch),
  });

  const createMutation = useMutation({
    mutationFn: (values: PatientFormValues) => api.createPatient(values),
    onSuccess: () => {
      toast.success('تمت إضافة المريض بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      setDialogOpen(false);
      setSelectedPatient(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر إضافة المريض');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: PatientFormValues }) =>
      api.updatePatient(id, values),
    onSuccess: () => {
      toast.success('تم تعديل بيانات المريض بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', selectedPatient?.id] });
      setDialogOpen(false);
      setSelectedPatient(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر تعديل بيانات المريض');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deletePatient(id),
    onSuccess: () => {
      toast.success('تم حذف المريض بنجاح');
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'تعذر حذف المريض');
    },
  });

  function handleOpenCreate() {
    setSelectedPatient(null);
    setDialogOpen(true);
  }

  function handleOpenEdit(patient: Patient) {
    setSelectedPatient(patient);
    setDialogOpen(true);
  }

  function handleSubmit(values: PatientFormValues) {
    if (selectedPatient) {
      updateMutation.mutate({ id: selectedPatient.id, values });
      return;
    }

    createMutation.mutate(values);
  }

  async function handleDelete(patient: Patient) {
    const result = await Swal.fire({
      title: 'تأكيد الحذف',
      text: `هل أنت متأكد من حذف المريض "${patient.name}"؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(patient.id);
    }
  }

  function handleView(patient: Patient) {
    router.push(`/patients/${patient.id}`);
  }

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
      <section className="bg-[#00150f] rounded-2xl p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b6954] blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2 rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f9bd22] opacity-80" />
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Patients Management</span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight">سجل المرضى</h1>
            <p className="text-sm text-white/60 max-w-sm font-medium leading-relaxed">
              إدارة جميع المرضى داخل العيادة بشكل منظم، مع إمكانية البحث السريع والإضافة والتعديل وفتح ملف المريض الكامل.
            </p>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <PatientsToolbar
              search={search}
              onSearchChange={setSearch}
              onAddClick={handleOpenCreate}
            />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div>
            <p className="text-xs text-white/50 mb-1">إجمالي المرضى</p>
            <p className="text-xl font-bold text-white tracking-tight">{patients.length}</p>
          </div>
          <div>
            <p className="text-xs text-white/50 mb-1">البحث السريع</p>
            <p className="text-lg font-bold text-[#f9bd22] tracking-tight">نشط</p>
          </div>
          <div>
            <p className="text-xs text-white/50 mb-1">الملف الطبي</p>
            <p className="text-lg font-bold text-[#2b6954] tracking-tight">سجلات مفصلة</p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-[#e3e2e0] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#e3e2e0]">
          <h2 className="text-sm font-bold text-[#00150f]">جميع المرضى</h2>
        </div>
        <div className="p-0">
          <PatientsTable
            patients={patients}
            isLoading={isLoading}
            onView={handleView}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        </div>
      </section>

      <PatientFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        patient={selectedPatient}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}