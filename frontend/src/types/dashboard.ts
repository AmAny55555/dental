export type RecentAppointment = {
  id: number;
  patient_name: string;
  time: string;
  status: string;
  notes?: string | null;
};

export type DashboardStats = {
  totalPatients: number;
  todayAppointments: number;
  totalPayments: number;
  followUpCases: number;
  recentAppointments: RecentAppointment[];
};