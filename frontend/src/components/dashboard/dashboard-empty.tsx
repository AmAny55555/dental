import { Card, CardContent } from "@/components/ui/card";

export default function DashboardEmpty() {
  return (
    <Card className="rounded-[32px] border-dashed border-slate-200 bg-white/70 shadow-lg backdrop-blur">
      <CardContent className="p-10 text-center">
        <h3 className="text-xl font-bold text-slate-800">لا توجد بيانات بعد</h3>
        <p className="mt-2 text-slate-500">
          ابدئي بإضافة مرضى أو مواعيد أو مدفوعات لعرض الإحصائيات هنا.
        </p>
      </CardContent>
    </Card>
  );
}