export type LoginPayload = {
  password: string;
};

export type Patient = {
  id: number;
  name: string;
  address?: string;
  job?: string;
  age?: number;
  phone: string;
  notes?: string;
};