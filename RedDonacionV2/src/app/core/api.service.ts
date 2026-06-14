import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { AidRequest, CreateDonationPayload, CreateRequestPayload, Donation, DonationStatus, RequestStatus } from './models';
import { MOCK_DONATIONS, MOCK_REQUESTS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');

  constructor(private readonly http: HttpClient, private readonly auth: AuthService) {}

  listDonations(filters: { status?: DonationStatus; location?: string } = {}): Observable<Donation[]> {
    let params = new HttpParams();
    if (filters.status) params = params.set('status', filters.status);
    if (filters.location) params = params.set('location', filters.location);
    return this.http.get<Donation[]>(`${this.apiBaseUrl}/donations`, { params }).pipe(
      catchError(error => environment.useMockOnApiError ? of(this.filterMockDonations(filters)) : throwError(() => error))
    );
  }

  getDonation(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiBaseUrl}/donations/${id}`).pipe(
      catchError(error => {
        const donation = MOCK_DONATIONS.find(item => item.id === id);
        return environment.useMockOnApiError && donation ? of(donation) : throwError(() => error);
      })
    );
  }

  createDonation(payload: CreateDonationPayload): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiBaseUrl}/donations`, payload, this.auth.authOptions());
  }

  updateDonationStatus(id: string, status: DonationStatus): Observable<Donation> {
    return this.http.patch<Donation>(`${this.apiBaseUrl}/donations/${id}/status`, { status }, this.auth.authOptions());
  }

  createRequest(payload: CreateRequestPayload): Observable<AidRequest> {
    return this.http.post<AidRequest>(`${this.apiBaseUrl}/requests`, payload, this.auth.authOptions());
  }

  myRequests(): Observable<AidRequest[]> {
    return this.http.get<AidRequest[]>(`${this.apiBaseUrl}/requests/me`, this.auth.authOptions()).pipe(
      catchError(error => environment.useMockOnApiError ? of(MOCK_REQUESTS) : throwError(() => error))
    );
  }

  updateRequestStatus(id: string, status: RequestStatus): Observable<AidRequest> {
    return this.http.patch<AidRequest>(`${this.apiBaseUrl}/requests/${id}/status`, { status }, this.auth.authOptions());
  }

  private filterMockDonations(filters: { status?: DonationStatus; location?: string }): Donation[] {
    return MOCK_DONATIONS.filter(item => {
      const statusOk = !filters.status || item.status === filters.status;
      const locationOk = !filters.location || item.location_address.toLowerCase().includes(filters.location.toLowerCase());
      return statusOk && locationOk;
    });
  }
}
