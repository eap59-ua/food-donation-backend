import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DonationRequestDTO {
  id: string;
  donation_id: string;
  donation_title: string;
  requester_id: string;
  requester_name: string;
  message?: string;
  requested_quantity?: string;
  status: RequestStatus;
  created_at: string;
  updated_at?: string;
  // Extras que no vienen del backend nativo, pero quizás el frontend inyecta o no existen.
  // Vamos a dejar los campos extras por si los mapeamos, pero el backend devuelve:
  // id, donation_id, donation_title, requester_id, requester_name, message, requested_quantity, status, created_at, updated_at
}

export interface CreateRequestDTO {
  donation_id: string;
  message?: string;
  requested_quantity?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private readonly baseUrl = `${environment.apiUrl}/requests`;

  constructor(private http: HttpClient) {}

  getMyRequests(): Observable<DonationRequestDTO[]> {
    return this.http.get<DonationRequestDTO[]>(`${this.baseUrl}/me`);
  }

  getAll(): Observable<DonationRequestDTO[]> {
    return this.http.get<DonationRequestDTO[]>(this.baseUrl);
  }

  create(data: CreateRequestDTO): Observable<DonationRequestDTO> {
    return this.http.post<DonationRequestDTO>(this.baseUrl, data);
  }

  updateStatus(id: string, status: RequestStatus): Observable<DonationRequestDTO> {
    return this.http.patch<DonationRequestDTO>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
