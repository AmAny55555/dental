import LoginForm from "@/components/forms/loginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, CalendarCheck2, ShieldCheck, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-5%] h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-[30rem] w-[30rem] rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:54px_54px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[40px] border border-white/80 bg-white/50 shadow-[0_30px_80px_-20px_rgba(2,44,34,0.15)] backdrop-blur-xl">
        <section className="hidden w-[56%] flex-col justify-between bg-[linear-gradient(135deg,#022c22_0%,#064e3b_100%)] p-12 text-white lg:flex">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              PRISTINE CLINIC EXPERIENCE
            </div>

            <div className="space-y-5">
              <h1 className="font-cairo text-5xl md:text-6xl font-black leading-[1.2] text-white">
                عيادة د. أحمد القرش
                <span className="block text-amber-400 mt-2">لطب وجراحة الأسنان</span>
              </h1>

              <p className="max-w-xl text-lg leading-8 text-emerald-50/80">
                نظام إدارة متكامل لتبسيط سير العمل في عيادتك. ننظم المواعيد والبيانات بدقة لتتفرغ أنت لتقديم أفضل رعاية لمرضاك.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
                <p className="text-xs font-medium text-emerald-200">سهولة الاستخدام</p>
                <p className="mt-3 font-cairo text-2xl md:text-3xl font-bold text-amber-400">100%</p>
              </article>

              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
                <p className="text-xs font-medium text-emerald-200">الوصول السريع</p>
                <p className="mt-3 font-cairo text-2xl md:text-3xl font-bold text-amber-400">24/7</p>
              </article>

              <article className="hidden md:block rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
                <p className="text-xs font-medium text-emerald-200">أمان البيانات</p>
                <p className="mt-3 font-cairo text-2xl md:text-3xl font-bold text-amber-400">تشفير</p>
              </article>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-emerald-50">
                <CalendarCheck2 className="h-5 w-5 text-amber-400" />
                تنظيم ذكي للمواعيد والمراجعات
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-emerald-50">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                ملفات إلكترونية حديثة للمرضى
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex w-full items-center justify-center bg-white/90 px-6 py-10 sm:px-10 lg:w-[44%] lg:px-16">
          <div className="absolute left-10 top-10 hidden rounded-2xl border border-stone-200/60 bg-white/80 p-4 text-stone-700 shadow-xl backdrop-blur-md lg:block">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
              <Activity className="h-4 w-4 text-amber-500" />
              Live Activity
            </div>
            <p className="mt-2 text-xs font-medium text-stone-500">Clinic operations online</p>
          </div>

          <Card className="w-full max-w-md border-0 bg-transparent shadow-none">
            <CardContent className="space-y-10 p-0">
              <div className="space-y-5 text-center lg:text-right">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,#022c22_0%,#064e3b_100%)] shadow-2xl shadow-emerald-900/20 lg:mx-0">
                  <Sparkles className="h-8 w-8 text-amber-400" />
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase">
                    Dental Clinic Platform
                  </p>
                  <h2 className="font-cairo text-4xl font-black text-stone-900">
                    تسجيل الدخول
                  </h2>
                  <p className="text-sm font-medium leading-relaxed text-stone-500">
                    ادخل الرقم السري للوصول الى لوحة التحكم ومتابعة العمل اليومي.
                  </p>
                </div>
              </div>

              <div className="rounded-[32px] bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-stone-950/5">
                <div className="rounded-[24px] bg-stone-50/50 p-6 sm:p-8">
                  <LoginForm />
                </div>
              </div>

              <p className="text-center text-xs font-medium leading-6 text-stone-400">
                هذا النظام مخصص للاستخدام الداخلي داخل العيادة فقط
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}