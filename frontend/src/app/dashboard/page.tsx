"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLoading from "@/components/dashboard/dashboard-loading";
import DashboardError from "@/components/dashboard/dashboard-error";
import DashboardEmpty from "@/components/dashboard/dashboard-empty";
import DashboardStatsSection from "@/components/dashboard/dashboard-stats";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import { dashboardService } from "@/services/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isCheckingAuth } = useAuthGuard();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardService.getStats,
    enabled: !isCheckingAuth,
  });

  if (isCheckingAuth) {
    return <DashboardLoading />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_35%),linear-gradient(to_bottom,_#f8fafc,_#ecfeff,_#e0f2fe)] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6 pb-8">
        <DashboardHeader />

        {/* زرار عرض المرضى */}
        <div className="flex justify-start">
          <Button
            onClick={() => router.push("/patients")}
            className="h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-5 text-white shadow-lg hover:from-cyan-600 hover:to-sky-700"
          >
            <Users className="ml-2 h-4 w-4" />
            عرض المرضى
          </Button>
        </div>

        {isLoading && <DashboardLoading />}
        {isError && <DashboardError />}

        {!isLoading && !isError && stats && (
          <>
            <DashboardStatsSection stats={stats} />
            <RecentAppointments
              appointments={stats.recentAppointments ?? []}
            />
          </>
        )}

        {!isLoading && !isError && !stats && <DashboardEmpty />}
      </div>
    </main>
  );
}