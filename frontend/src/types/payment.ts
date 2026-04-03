export interface Payment {
  id: number;
  patient_id: number;
  total_amount: number;
  paid: number;
  remaining: number;
  date: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PaymentFormValues {
  patient_id: string;
  total_amount: string;
  paid: string;
  remaining: string;
  date: string;
}