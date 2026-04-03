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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#ecfeff,_#e0f2fe)] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6 pb-8">
        <section className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-white shadow-lg">
                    <Users className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                      Patients Management
                    </p>

                    <h1 className="text-3xl font-extrabold text-slate-800 md:text-4xl">
                      صفحة المرضى
                    </h1>

                    <p className="max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                      إدارة جميع المرضى داخل العيادة بشكل منظم، مع إمكانية البحث
                      السريع والإضافة والتعديل والحذف وفتح ملف المريض الكامل.
                    </p>
                  </div>
                </div>
              </div>

              <PatientsToolbar
                search={search}
                onSearchChange={setSearch}
                onAddClick={handleOpenCreate}
              />
            </div>

            <div className="hidden bg-gradient-to-br from-cyan-600 via-sky-600 to-teal-500 p-8 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur">
                  🦷
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold leading-tight">
                    إدارة ملفات المرضى
                  </h2>

                  <p className="text-sm leading-7 text-cyan-50/90">
                    كل بيانات المريض في مكان واحد، من البيانات الأساسية وحتى
                    المتابعة وخطة العلاج.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-cyan-100">إجمالي المرضى</p>
                  <p className="mt-2 text-2xl font-bold">{patients.length}</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-cyan-100">البحث السريع</p>
                  <p className="mt-2 text-lg font-bold">بالاسم أو الهاتف</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-cyan-100">الملف الطبي</p>
                  <p className="mt-2 text-lg font-bold">بيانات منظمة</p>
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm text-cyan-100">الإجراءات</p>
                  <p className="mt-2 text-lg font-bold">عرض وتعديل وحذف</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur md:p-6">
          <PatientsTable
            patients={patients}
            isLoading={isLoading}
            onView={handleView}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        </section>

        <PatientFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          patient={selectedPatient}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </div>
    </main>
  );
}