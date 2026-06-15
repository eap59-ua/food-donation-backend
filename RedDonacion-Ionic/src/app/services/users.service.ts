import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserResponseDTO } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(this.baseUrl);
  }

  create(data: { name: string; email: string; password: string; role: string }): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${environment.apiUrl}/auth/register`, data);
  }

  update(id: string, data: Partial<{ name: string; email: string; role: string; is_active: boolean }>): Observable<UserResponseDTO> {
    return this.http.patch<UserResponseDTO>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
