import { http } from '@/api/http';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  role: 'DONANTE' | 'RECEPTOR' | 'ONG';
}

export interface TokenDTO {
  access_token: string;
  token_type: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export const authApi = {
  login: async (data: LoginRequestDTO): Promise<TokenDTO> => {
    const response = await http.post<TokenDTO>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterUserDTO): Promise<UserResponseDTO> => {
    const response = await http.post<UserResponseDTO>('/auth/register', data);
    return response.data;
  },

  getMe: async (): Promise<UserResponseDTO> => {
    const response = await http.get<UserResponseDTO>('/auth/me');
    return response.data;
  }
};
