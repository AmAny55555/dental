import LoginForm from "@/components/forms/loginForm";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-sky-100 p-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-2xl backdrop-blur">
        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-cyan-600 via-sky-600 to-teal-500 p-10 text-white lg:flex">
          <div className="space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg backdrop-blur">
              🦷
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-100 uppercase">
                Dental Clinic System
              </p>

              <h1 className="text-4xl font-extrabold leading-tight">
                د. أحمد القرش
              </h1>

              <p className="max-w-md text-sm leading-7 text-cyan-50/90">
                نظام متكامل لإدارة المرضى والمواعيد والمدفوعات وخطط العلاج
                داخل عيادة الأسنان بشكل منظم وسهل وآمن.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-cyan-100">إدارة المرضى</p>
              <p className="mt-2 text-lg font-bold">ملفات منظمة</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-cyan-100">المواعيد</p>
              <p className="mt-2 text-lg font-bold">تنسيق يومي دقيق</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-cyan-100">المدفوعات</p>
              <p className="mt-2 text-lg font-bold">متابعة واضحة</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-cyan-100">خطة العلاج</p>
              <p className="mt-2 text-lg font-bold">سجل طبي كامل</p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-1/2 lg:px-12">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardContent className="space-y-8 p-0">
              <div className="space-y-4 text-center lg:text-right">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-4xl text-white shadow-xl lg:mx-0">
                  🦷
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">
                    تسجيل الدخول
                  </h2>
                  <p className="text-sm leading-6 text-slate-500">
                    أدخل الرقم السري للوصول إلى نظام إدارة العيادة
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm">
                <LoginForm />
              </div>

              <p className="text-center text-xs leading-6 text-slate-400">
                هذا النظام مخصص للاستخدام الداخلي داخل العيادة فقط
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}