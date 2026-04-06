import { Activity, CalendarDays, Users, Wallet } from "lucide-react";
import { DashboardStats } from "@/types/dashboard";
import StatCard from "./stat-card";
type DashboardStatsProps = {
  stats: DashboardStats;
};

export default function DashboardStatsSection({
  stats,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:gap-6 select-none h-full">
      <StatCard
        title="المرضى"
        value={stats.totalPatients}
        icon={Users}
        hint="إجمالي عدد المرضى"
      />
      <StatCard
        title="مواعيد اليوم"
        value={stats.todayAppointments}
        icon={CalendarDays}
        hint="عدد مواعيد اليوم"
      />
      <StatCard
        title="المدفوعات"
        value={stats.totalPayments}
        icon={Wallet}
        hint="إجمالي المدفوعات"
      />
      <StatCard
        title="متابعة"
        value={stats.followUpCases}
        icon={Activity}
        hint="الحالات المؤجلة"
      />
    </section>
  );
}