"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardLoading from "@/components/dashboard/dashboard-loading";
import DashboardError from "@/components/dashboard/dashboard-error";
import DashboardEmpty from "@/components/dashboard/dashboard-empty";
import DashboardStatsSection from "@/components/dashboard/dashboard-stats";
import RecentAppointments from "@/components/dashboard/RecentAppointments";
import { AppLayout } from "@/components/layout/app-layout";
import { dashboardService } from "@/services/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";

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
    <AppLayout>
      {/* Page Content */}
      <div className="p-4 sm:p-6 lg:p-8 xl:p-10 space-y-6 lg:space-y-10 max-w-[1400px] w-full mx-auto">
        {/* Grid Layout Top Area */}
        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 hover:cursor-default">
          <div className="lg:col-span-1 xl:col-span-2 h-full flex">
            <DashboardHeader />
          </div>
          
          {stats && !isLoading && !isError && (
             <div className="lg:col-span-1 xl:col-span-2">
               <DashboardStatsSection stats={stats} />
             </div>
          )}
        </section>

        {isLoading && <DashboardLoading />}
        {isError && <DashboardError />}
        
        {!isLoading && !isError && stats && (
          <section className="w-full">
            <RecentAppointments appointments={stats.recentAppointments ?? []} />
          </section>
        )}

        {!isLoading && !isError && !stats && <DashboardEmpty />}
      </div>
    </AppLayout>
  );
}