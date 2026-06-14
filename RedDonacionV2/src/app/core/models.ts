export type UserRole = 'DONANTE' | 'RECEPTOR' | 'ONG' | 'ADMIN';
export type DonationStatus = 'AVAILABLE' | 'RESERVED' | 'COMPLETED' | 'EXPIRED';
export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  role: UserRole;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  title: string;
  description?: string | null;
  quantity: string;
  location_address: string;
  expiration_date?: string | null;
  status: DonationStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateDonationPayload {
  title: string;
  description?: string | null;
  quantity: string;
  location_address: string;
  expiration_date?: string | null;
}

export interface AidRequest {
  id: string;
  donation_id: string;
  requester_id: string;
  message?: string | null;
  requested_quantity?: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateRequestPayload {
  donation_id: string;
  message?: string | null;
  requested_quantity?: string | null;
}
