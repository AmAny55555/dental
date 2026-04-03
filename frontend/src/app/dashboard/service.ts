import { DashboardStats } from "@/types/dashboard";

const BASE_URL = "http://localhost:8000/api";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await fetch(`${BASE_URL}/dashboard/stats`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch dashboard stats");
    }

    return result.data ?? result;
  },
};