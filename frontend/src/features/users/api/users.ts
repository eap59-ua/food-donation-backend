import { http } from '@/api/http';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'organization';
  organization_name?: string;
  created_at: string;
  updated_at: string;
}

export const usersApi = {
  getProfile: () =>
    http.get<UserProfile>('/users/profile').then(res => res.data),

  updateProfile: (data: Partial<UserProfile>) =>
    http.put<UserProfile>('/users/profile', data).then(res => res.data),

  getStats: () =>
    http.get<{ donations: number; requests: number; impact_kg: number }>('/users/stats').then(res => res.data),
};
