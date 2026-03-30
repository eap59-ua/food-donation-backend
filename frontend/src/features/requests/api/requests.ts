import { http } from '@/api/http';

export interface RequestResponseDTO {
    id: string;
    donation_id: string;
    requester_id: string;
    message: string | null;
    requested_quantity: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    created_at: string;
    updated_at: string;
}

export interface CreateRequestDTO {
    donation_id: string;
    message?: string;
    requested_quantity?: string;
}

export const requestsApi = {
    create: async (data: CreateRequestDTO): Promise<RequestResponseDTO> => {
        const response = await http.post<RequestResponseDTO>('/requests', data);
        return response.data;
    },

    getMyRequests: async (): Promise<RequestResponseDTO[]> => {
        const response = await http.get<RequestResponseDTO[]>('/requests/me');
        return response.data;
    },

    updateStatus: async (id: string, status: 'APPROVED' | 'REJECTED'): Promise<RequestResponseDTO> => {
        const response = await http.patch<RequestResponseDTO>(`/requests/${id}/status`, { status });
        return response.data;
    },
};
