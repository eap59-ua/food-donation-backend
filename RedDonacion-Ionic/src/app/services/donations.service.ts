import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type DonationStatus = 'AVAILABLE' | 'RESERVED' | 'COMPLETED' | 'EXPIRED';

export interface DonationDTO {
  id: string;
  title: string;
  description: string;
  quantity: string;
  location_address: string;
  expiration_date: string | null;
  status: DonationStatus;
  donor_id: string;
  donor_name: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateDonationDTO {
  title: string;
  description: string;
  quantity: string;
  location_address: string;
  expiration_date: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  private readonly baseUrl = `${environment.apiUrl}/donations`;

  constructor(private http: HttpClient) {}

  getAll(status?: DonationStatus): Observable<DonationDTO[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<DonationDTO[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<DonationDTO> {
    return this.http.get<DonationDTO>(`${this.baseUrl}/${id}`);
  }

  getMyDonations(): Observable<DonationDTO[]> {
    return this.http.get<DonationDTO[]>(`${this.baseUrl}/my`);
  }

  create(data: CreateDonationDTO): Observable<DonationDTO> {
    return this.http.post<DonationDTO>(this.baseUrl, data);
  }

  updateStatus(id: string, status: DonationStatus): Observable<DonationDTO> {
    return this.http.patch<DonationDTO>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}