import { http } from '@/api/http';

export interface Donation {
  id: string;
  title: string;
  description: string;
  food_type: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  location: string;
  status: 'available' | 'claimed' | 'expired';
  donor_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDonationRequest {
  title: string;
  description: string;
  food_type: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  location: string;
}

export const donationsApi = {
  getAll: () =>
    http.get<Donation[]>('/donations').then(res => res.data),

  getById: (id: string) =>
    http.get<Donation>(`/donations/${id}`).then(res => res.data),

  create: (data: CreateDonationRequest) =>
    http.post<Donation>('/donations', data).then(res => res.data),

  update: (id: string, data: Partial<CreateDonationRequest>) =>
    http.put<Donation>(`/donations/${id}`, data).then(res => res.data),

  delete: (id: string) =>
    http.delete(`/donations/${id}`),

  claim: (donationId: string, organizationId: string) =>
    http.post(`/donations/${donationId}/claim`, { organization_id: organizationId }),

  getMyDonations: () =>
    http.get<Donation[]>('/donations/mine').then(res => res.data),

  search: (query: string) =>
    http.get<Donation[]>('/donations/search', { params: { q: query } }).then(res => res.data),
};
