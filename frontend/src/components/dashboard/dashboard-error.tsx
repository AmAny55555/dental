import { Card, CardContent } from "@/components/ui/card";

export default function DashboardError() {
  return (
    <Card className="rounded-[32px] border-red-200 bg-red-50/80 shadow-lg backdrop-blur">
      <CardContent className="p-10 text-center">
        <h3 className="text-xl font-bold text-red-700">
          حدث خطأ أثناء تحميل البيانات
        </h3>
        <p className="mt-2 text-sm text-red-500">
          تعذر جلب إحصائيات لوحة التحكم، حاولي مرة أخرى بعد قليل.
        </p>
      </CardContent>
    </Card>
  );
}