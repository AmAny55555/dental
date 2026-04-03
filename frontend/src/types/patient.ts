export interface Patient {
  id: number;
  name: string;
  phone?: string | null;
  address?: string | null;
  job_title?: string | null;
  age?: number | null;

  last_visit_date?: string | null;
  patient_status?: string | null;
  follow_up_notes?: string | null;
  next_follow_up_date?: string | null;

  medical_history?: string | null;
  allergies?: string | null;
  chronic_diseases?: string | null;
  current_medications?: string | null;

  treatment_diagnosis?: string | null;
  treatment_type?: string | null;
  treatment_sessions?: number | null;
  treatment_status?: string | null;
  treatment_notes?: string | null;

  created_at?: string;
  updated_at?: string;
}

export interface PatientFormValues {
  name: string;
  phone: string;
  address: string;
  job_title: string;
  age: string;

  last_visit_date?: string;
  patient_status?: string;
  follow_up_notes?: string;
  next_follow_up_date?: string;

  medical_history?: string;
  allergies?: string;
  chronic_diseases?: string;
  current_medications?: string;

  treatment_diagnosis?: string;
  treatment_type?: string;
  treatment_sessions?: string;
  treatment_status?: string;
  treatment_notes?: string;
}

export interface PatientsResponse {
  data: Patient[];
}