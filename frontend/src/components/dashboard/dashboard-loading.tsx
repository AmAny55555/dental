import Spinner from "@/components/ui/Spinner";
import { Card, CardContent } from "@/components/ui/card";

function SkeletonCard() {
  return (
    <Card className="rounded-[28px] border-[#e3e2e0] bg-[#faf9f7] shadow-sm">
      <CardContent className="p-5">
        <div className="animate-pulse space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3 text-right">
              <div className="h-4 w-24 rounded-full bg-slate-200" />
              <div className="h-8 w-20 rounded-full bg-[#adedd3]" />
              <div className="h-3 w-32 rounded-full bg-slate-200" />
            </div>

            <div className="h-12 w-12 rounded-2xl bg-[#e3e2e0]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardLoading() {
  return (
    <Card className="rounded-[32px] border-[#e3e2e0] bg-white shadow-sm">
      <CardContent className="p-10">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <div className="rounded-3xl bg-[#2b6954] p-4 shadow-lg text-white">
            <Spinner />
          </div>

          <div className="space-y-2">
            <h3 className="font-cairo text-xl font-bold text-[#00150f]">
              جاري تحميل الإحصائيات...
            </h3>
            <p className="text-sm font-medium text-[#717975]">
              يتم تجهيز بيانات لوحة التحكم
            </p>
          </div>

          <div className="grid w-full gap-4 pt-4 md:grid-cols-2 xl:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}