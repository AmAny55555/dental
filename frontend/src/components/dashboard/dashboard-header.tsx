import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("ar-EG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full bg-[#00150f] rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between min-h-[200px] relative overflow-hidden shadow-lg">
      <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#2b6954]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-64 h-64 bg-[#f9bd22]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <span className="text-[#f9bd22] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#f9bd22]/30 px-3 py-1.5 rounded-md flex items-center gap-2 w-fit bg-[#f9bd22]/5">
          <CalendarDays className="w-3.5 h-3.5" />
          {currentDate}
        </span>
        <h3 className="font-cairo text-3xl md:text-4xl font-black mt-5 leading-snug">
          أهلاً بك يا دكتور،<br />
          <span className="text-[#a7cfc0]">احمد القرش لطب الأسنان</span>
        </h3>
        <p className="text-[#a7cfc0]/90 text-sm mt-3 max-w-md leading-relaxed font-medium">
          يوجد لديك إشعارات جديدة ومواعيد مجدولة لليوم. فريق الاستقبال بانتظار توجيهاتك لمتابعة الحالات.
        </p>
      </div>

      <div className="mt-8 relative z-10">
        <button className="bg-[#f9bd22] text-[#00150f] px-8 py-3 rounded-lg font-bold text-xs hover:bg-white hover:text-[#00150f] transition-colors shadow-md">
          بدء جولة العيادة
        </button>
      </div>
    </div>
  );
}