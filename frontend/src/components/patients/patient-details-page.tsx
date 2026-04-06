'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Briefcase,
  Cake,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Stethoscope,
  UserRound,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { PatientAppointmentsTab } from '@/components/patients/patient-appointments-tab';
import { PatientPaymentsSection } from '@/components/patients/patient-payments-section';
import { PatientFollowUpTab } from '@/components/patients/patient-follow-up-tab';
import { PatientMedicalHistoryTab } from '@/components/patients/patient-medical-history-tab';
import { PatientTreatmentPlanTab } from '@/components/patients/patient-treatment-plan-tab';
import { api } from '@/services/api';
import { Patient } from '@/types/patient';

export function PatientDetailsPage() {
  const params = useParams();
  const rawId = params?.id;
  const patientId = Array.isArray(rawId) ? Number(rawId[0]) : Number(rawId);

  const {
    data: patient,
    isLoading,
    isError,
    error,
  } = useQuery<Patient>({
    queryKey: ['patient', patientId],
    queryFn: () => api.getPatient(patientId),
    enabled: !Number.isNaN(patientId) && patientId > 0,
    retry: false,
  });

  if (Number.isNaN(patientId) || patientId <= 0) {
    return (
      <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border border-[#e3e2e0] rounded-xl overflow-hidden p-8 text-center">
            <p className="text-lg font-bold text-[#00150f]">الرابط غير صحيح</p>
            <p className="mt-2 text-sm text-[#717975]">
              لم يتم العثور على رقم مريض صالح داخل الرابط.
            </p>

            <div className="mt-6">
              <Link href="/patients">
                <Button className="rounded-2xl bg-[#00150f] text-white hover:bg-[#2b6954]">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  الرجوع إلى المرضى
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border border-[#e3e2e0] rounded-xl overflow-hidden p-8 text-center">
            <p className="text-sm font-medium text-[#717975]">
              جاري تحميل بيانات المريض...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border border-[#e3e2e0] rounded-xl overflow-hidden p-8 text-center">
            <p className="text-lg font-bold text-[#00150f]">
              تعذر تحميل بيانات المريض
            </p>
            <p className="mt-2 text-sm text-red-500">
              {error instanceof Error ? error.message : 'حدث خطأ غير متوقع'}
            </p>

            <div className="mt-6">
              <Link href="/patients">
                <Button className="rounded-2xl bg-[#00150f] text-white hover:bg-[#2b6954]">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  الرجوع إلى المرضى
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white border border-[#e3e2e0] rounded-xl overflow-hidden p-8 text-center">
            <p className="text-lg font-bold text-[#00150f]">
              المريض غير موجود
            </p>
            <p className="mt-2 text-sm text-[#717975]">
              لم يتم العثور على بيانات لهذا المريض.
            </p>

            <div className="mt-6">
              <Link href="/patients">
                <Button className="rounded-2xl bg-[#00150f] text-white hover:bg-[#2b6954]">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  الرجوع إلى المرضى
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const basicInfoCards = [
    {
      label: 'الاسم',
      value: patient.name || '-',
      icon: UserRound,
    },
    {
      label: 'رقم الهاتف',
      value: patient.phone || '-',
      icon: Phone,
    },
    {
      label: 'العمر',
      value: patient.age ? `${patient.age} سنة` : '-',
      icon: Cake,
    },
    {
      label: 'الوظيفة',
      value: patient.job_title || '-',
      icon: Briefcase,
    },
    {
      label: 'العنوان',
      value: patient.address || '-',
      icon: MapPin,
    },
  ];

  const followUpCards = [
    {
      label: 'آخر زيارة',
      value: patient.last_visit_date || '-',
    },
    {
      label: 'حالة المريض',
      value: patient.patient_status || '-',
    },
    {
      label: 'موعد المتابعة القادم',
      value: patient.next_follow_up_date || '-',
    },
    {
      label: 'ملاحظات المتابعة',
      value: patient.follow_up_notes || 'لا توجد ملاحظات',
    },
  ];

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-[1400px] w-full mx-auto bg-[#ffffff]">
      <div className="mx-auto max-w-7xl space-y-6 pb-8">
        <section className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-2xl backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/patients">
                  <Button
                    variant="outline"
                    className="rounded-2xl border-slate-200 bg-white/80 shadow-sm hover:bg-[#faf9f7]"
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                    رجوع
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b6954]">
                  Patient Details
                </p>

                <h1 className="text-3xl font-extrabold text-[#00150f] md:text-4xl">
                  {patient.name}
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-[#717975] md:text-base">
                  ملف المريض الكامل داخل العيادة، ويشمل البيانات الأساسية
                  والمواعيد والمدفوعات والمتابعة والتاريخ الطبي وخطة العلاج.
                </p>
              </div>
            </div>

            <div className="hidden bg-gradient-to-br bg-[#00150f] p-8 text-white lg:flex lg:flex-col lg:justify-between">
              <div className="space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur">
                  🦷
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-extrabold leading-tight">
                    ملف المريض
                  </h2>

                  <p className="text-sm leading-7 text-white/60">
                    كل ما يخص المريض في صفحة واحدة بشكل منظم وسهل للوصول.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-white/50">رقم الهاتف</p>
                <p className="mt-2 text-xl font-bold">{patient.phone || '-'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-white/80 p-4 shadow-xl backdrop-blur md:p-6">
          <Tabs defaultValue="basic-info" className="space-y-6">
            <TabsList className="h-auto w-full justify-start gap-3 overflow-x-auto rounded-[28px] bg-slate-100 p-3 md:p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <TabsTrigger value="basic-info" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <UserRound className="ml-2 h-4 w-4" />
                البيانات الأساسية
              </TabsTrigger>

              <TabsTrigger value="appointments" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <CalendarDays className="ml-2 h-4 w-4" />
                المواعيد
              </TabsTrigger>

              <TabsTrigger value="payments" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <CreditCard className="ml-2 h-4 w-4" />
                المدفوعات
              </TabsTrigger>

              <TabsTrigger value="follow-up" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <ClipboardList className="ml-2 h-4 w-4" />
                المتابعة
              </TabsTrigger>

              <TabsTrigger value="medical-history" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <FileText className="ml-2 h-4 w-4" />
                التاريخ الطبي
              </TabsTrigger>

              <TabsTrigger value="treatment-plan" className="min-h-12 rounded-2xl px-4 py-3 text-sm md:px-5 md:py-3.5 md:text-base shrink-0">
                <Stethoscope className="ml-2 h-4 w-4" />
                خطة العلاج
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="mt-0">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {basicInfoCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-[#717975]">
                              {item.label}
                            </p>
                            <p className="break-words text-lg font-bold text-[#00150f]">
                              {item.value}
                            </p>
                          </div>

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b6954] text-white shadow-md">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#00150f]">
                      ملخص المتابعة
                    </h3>
                    <p className="text-sm text-[#717975]">
                      آخر بيانات متابعة محفوظة لهذا المريض.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {followUpCards.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <p className="text-sm font-medium text-[#717975]">
                          {item.label}
                        </p>
                        <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#00150f]">
                      ملخص التاريخ الطبي
                    </h3>
                    <p className="text-sm text-[#717975]">
                      آخر بيانات التاريخ الطبي المحفوظة لهذا المريض.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
                      <p className="text-sm font-medium text-[#717975]">
                        التاريخ الطبي
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.medical_history || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-medium text-[#717975]">
                        الحساسية
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.allergies || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-medium text-[#717975]">
                        الأمراض المزمنة
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.chronic_diseases || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
                      <p className="text-sm font-medium text-[#717975]">
                        الأدوية الحالية
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.current_medications || '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#e3e2e0] bg-[#faf9f7] p-5 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#00150f]">
                      ملخص خطة العلاج
                    </h3>
                    <p className="text-sm text-[#717975]">
                      آخر بيانات خطة العلاج المحفوظة لهذا المريض.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
                      <p className="text-sm font-medium text-[#717975]">
                        التشخيص
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.treatment_diagnosis || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-medium text-[#717975]">
                        نوع العلاج
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.treatment_type || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-medium text-[#717975]">
                        عدد الجلسات
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.treatment_sessions
                          ? String(patient.treatment_sessions)
                          : '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-sm font-medium text-[#717975]">
                        حالة العلاج
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.treatment_status || '-'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
                      <p className="text-sm font-medium text-[#717975]">
                        ملاحظات العلاج
                      </p>
                      <p className="mt-2 break-words text-base font-bold text-[#00150f]">
                        {patient.treatment_notes || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <PatientAppointmentsTab patientId={String(patientId)} />
            </TabsContent>

            <TabsContent value="payments" className="mt-0">
              <PatientPaymentsSection patientId={String(patientId)} />
            </TabsContent>

            <TabsContent value="follow-up" className="mt-0">
              <PatientFollowUpTab patient={patient} />
            </TabsContent>

            <TabsContent value="medical-history" className="mt-0">
              <PatientMedicalHistoryTab patient={patient} />
            </TabsContent>

            <TabsContent value="treatment-plan" className="mt-0">
              <PatientTreatmentPlanTab patient={patient} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}

