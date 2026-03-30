import { http } from '@/api/http';

export interface Request {
  id: string;
  title: string;
  description: string;
  food_type: string;
  quantity_needed: number;
  unit: string;
  status: 'open' | 'matched' | 'fulfilled';
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRequestRequest {
  title: string;
  description: string;
  food_type: string;
  quantity_needed: number;
  unit: string;
}

export const requestsApi = {
  getAll: () =>
    http.get<Request[]>('/requests').then(res => res.data),

  getById: (id: string) =>
    http.get<Request>(`/requests/${id}`).then(res => res.data),

  create: (data: CreateRequestRequest) =>
    http.post<Request>('/requests', data).then(res => res.data),

  update: (id: string, data: Partial<CreateRequestRequest>) =>
    http.put<Request>(`/requests/${id}`, data).then(res => res.data),

  delete: (id: string) =>
    http.delete(`/requests/${id}`),

  getMine: () =>
    http.get<Request[]>('/requests/mine').then(res => res.data),

  search: (query: string) =>
    http.get<Request[]>('/requests/search', { params: { q: query } }).then(res => res.data),
};
