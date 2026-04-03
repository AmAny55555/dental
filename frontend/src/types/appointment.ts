export type AppointmentStatus = 'pending' | 'done' | 'cancelled';

export interface Appointment {
  id: number;
  patient_id: number;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes: string | null;
  patient?: {
    id: number;
    name: string;
    phone?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentFormValues {
  patient_id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes: string;
}