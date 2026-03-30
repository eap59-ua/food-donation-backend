import { http } from '@/api/http';

export interface DonationResponseDTO {
    id: string;
    donor_id: string;
    title: string;
    description: string | null;
    quantity: string;
    location_address: string;
    expiration_date: string | null;
    status: 'AVAILABLE' | 'RESERVED' | 'COMPLETED' | 'EXPIRED';
    created_at: string;
    updated_at: string;
}

export interface CreateDonationDTO {
    title: string;
    description?: string;
    quantity: string;
    location_address: string;
    expiration_date?: string;
}

export interface UpdateDonationDTO {
    title?: string;
    description?: string;
    quantity?: string;
    location_address?: string;
    expiration_date?: string;
}

export const donationsApi = {
    list: async (status?: string, location?: string): Promise<DonationResponseDTO[]> => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (location) params.append('location', location);
        const query = params.toString();
        const response = await http.get<DonationResponseDTO[]>(`/donations${query ? `?${query}` : ''}`);
        return response.data;
    },

    getById: async (id: string): Promise<DonationResponseDTO> => {
        const response = await http.get<DonationResponseDTO>(`/donations/${id}`);
        return response.data;
    },

    create: async (data: CreateDonationDTO): Promise<DonationResponseDTO> => {
        const response = await http.post<DonationResponseDTO>('/donations', data);
        return response.data;
    },

    update: async (id: string, data: UpdateDonationDTO): Promise<DonationResponseDTO> => {
        const response = await http.put<DonationResponseDTO>(`/donations/${id}`, data);
        return response.data;
    },

    updateStatus: async (id: string, status: string): Promise<DonationResponseDTO> => {
        const response = await http.patch<DonationResponseDTO>(`/donations/${id}/status`, { status });
        return response.data;
    },
};
