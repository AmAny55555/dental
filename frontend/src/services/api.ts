import { LoginPayload } from '@/types';
import { PatientFormValues } from '@/types/patient';
import { AppointmentFormValues } from '@/types/appointment';
import { PaymentFormValues } from '@/types/payment';

const BASE_URL = 'http://localhost:8000/api';

function getHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

async function parseResponse(res: Response) {
  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('الرد من السيرفر ليس JSON صحيح');
  }
}

// 🔥 بديل interceptor
async function handleApiResponse(res: Response) {
  const result = await parseResponse(res);

  if (res.status === 401) {
    localStorage.removeItem('token');

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    throw new Error(result?.message || 'Unauthorized');
  }

  if (!res.ok) {
    throw new Error(result?.message || 'حدث خطأ أثناء تنفيذ الطلب');
  }

  return result;
}

function mapPatientPayload(data: PatientFormValues | Record<string, unknown>) {
  const values = data as PatientFormValues;

  return {
    ...data,
    name: values.name?.toString().trim?.() ?? data.name,
    phone: values.phone?.toString().trim?.() ?? data.phone,
    address: values.address?.toString().trim?.() || null,
    job_title: values.job_title?.toString().trim?.() || null,
    age: values.age ? Number(values.age) : null,
  };
}

export const api = {
  // ✅ login من غير تخزين توكن هنا
  login: async (data: LoginPayload) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    return handleApiResponse(res);
  },

  // ================== PATIENTS ==================

  getPatients: async (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';

    const res = await fetch(`${BASE_URL}/patients${query}`, {
      headers: getHeaders(),
    });

    const result = await handleApiResponse(res);

    return Array.isArray(result) ? result : result?.data ?? [];
  },

  createPatient: async (data: PatientFormValues | Record<string, unknown>) => {
    const res = await fetch(`${BASE_URL}/patients`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(mapPatientPayload(data)),
    });

    const result = await handleApiResponse(res);

    return result?.data ?? result;
  },

  getPatient: async (id: number | string) => {
    const patientId = Number(id);

    if (!patientId || Number.isNaN(patientId)) {
      throw new Error('Invalid patient id');
    }

    const res = await fetch(`${BASE_URL}/patients/${patientId}`, {
      headers: getHeaders(),
    });

    const result = await handleApiResponse(res);

    if (!result) {
      throw new Error('Patient response is empty');
    }

    return result?.data ?? result;
  },

  updatePatient: async (
    id: number | string,
    data: PatientFormValues | Record<string, unknown>
  ) => {
    const res = await fetch(`${BASE_URL}/patients/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(mapPatientPayload(data)),
    });

    const result = await handleApiResponse(res);

    return result?.data ?? result;
  },

  deletePatient: async (id: number | string) => {
    const res = await fetch(`${BASE_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleApiResponse(res);
  },

  // ================== APPOINTMENTS ==================

  getAppointments: async (patientId?: number | string) => {
    const normalizedPatientId =
      patientId !== undefined && patientId !== null && patientId !== ''
        ? Number(patientId)
        : undefined;

    const query =
      normalizedPatientId && !Number.isNaN(normalizedPatientId)
        ? `?patient_id=${normalizedPatientId}`
        : '';

    const res = await fetch(`${BASE_URL}/appointments${query}`, {
      headers: getHeaders(),
    });

    const result = await handleApiResponse(res);

    return Array.isArray(result) ? result : result?.data ?? [];
  },

  createAppointment: async (data: AppointmentFormValues) => {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        ...data,
        patient_id: Number(data.patient_id),
      }),
    });

    const result = await handleApiResponse(res);

    return result?.data ?? result;
  },

  updateAppointment: async (
    id: number | string,
    data: AppointmentFormValues
  ) => {
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        ...data,
        patient_id: Number(data.patient_id),
      }),
    });

    const result = await handleApiResponse(res);

    return result?.data ?? result;
  },

  deleteAppointment: async (id: number | string) => {
    const res = await fetch(`${BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleApiResponse(res);
  },

  // ================== PAYMENTS ==================

  getPayments: async (patientId?: number | string) => {
    const normalizedPatientId =
      patientId !== undefined && patientId !== null && patientId !== ''
        ? Number(patientId)
        : undefined;

    const query =
      normalizedPatientId && !Number.isNaN(normalizedPatientId)
        ? `?patient_id=${normalizedPatientId}`
        : '';

    const res = await fetch(`${BASE_URL}/payments${query}`, {
      headers: getHeaders(),
    });

    const result = await handleApiResponse(res);

    return Array.isArray(result) ? result : result?.data ?? [];
  },

  createPayment: async (data: PaymentFormValues) => {
    const res = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        ...data,
        patient_id: Number(data.patient_id),
        total_amount: Number(data.total_amount),
        paid: Number(data.paid),
        remaining: Number(data.remaining),
      }),
    });

    const result = await handleApiResponse(res);

    return result?.data ?? result;
  },
};

export const dashboardService = {
  getStats: async () => {
    const res = await fetch(`${BASE_URL}/dashboard/stats`, {
      headers: getHeaders(),
    });

    return handleApiResponse(res);
  },
};