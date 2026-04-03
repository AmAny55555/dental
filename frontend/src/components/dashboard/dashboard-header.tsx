import { Card, CardContent } from "@/components/ui/card";

export default function DashboardHeader() {
  return (
    <Card className="overflow-hidden rounded-[32px] border-white/60 bg-white/70 shadow-[0_30px_120px_-30px_rgba(14,116,144,0.35)] backdrop-blur">
      <CardContent className="relative p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 via-transparent to-sky-500/10" />
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 text-right">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-sm font-medium text-cyan-700">
              نظام إدارة العيادة
            </span>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                لوحة التحكم
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                متابعة سريعة ومباشرة لإحصائيات العيادة اليومية
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="rounded-[28px] border border-white/70 bg-white/80 px-5 py-4 text-right shadow-[0_20px_80px_-30px_rgba(14,116,144,0.35)] backdrop-blur">
              <p className="text-sm text-slate-500">حالة النظام</p>
              <p className="mt-1 text-lg font-bold text-slate-900">جاهز للعمل</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}