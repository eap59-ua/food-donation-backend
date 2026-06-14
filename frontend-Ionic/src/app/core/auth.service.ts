import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginPayload, RegisterPayload, TokenResponse, User } from './models';
import { MOCK_USER } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'red_donacion_access_token';
  private readonly userKey = 'red_donacion_user';
  private readonly apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly userSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  readonly user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  restoreSession(): void {
    if (!this.token) {
      this.userSubject.next(null);
      return;
    }
    this.me().subscribe({
      error: () => {
        if (!environment.useMockOnApiError) {
          this.logout(false);
        }
      }
    });
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/auth/register`, payload).pipe(
      tap(user => this.persistUser(user))
    );
  }

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<TokenResponse>(`${this.apiBaseUrl}/auth/login`, payload).pipe(
      tap(token => localStorage.setItem(this.tokenKey, token.access_token)),
      switchMap(() => this.me())
    );
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.apiBaseUrl}/auth/me`, this.authOptions()).pipe(
      tap(user => this.persistUser(user)),
      catchError(error => {
        if (environment.useMockOnApiError && this.token) {
          const stored = this.getStoredUser() ?? MOCK_USER;
          this.persistUser(stored);
          return of(stored);
        }
        return throwError(() => error);
      })
    );
  }

  logout(redirect = true): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
    if (redirect) {
      window.location.href = '/login';
    }
  }

  authOptions(): { headers: HttpHeaders } {
    const token = this.token;
    return {
      headers: token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders()
    };
  }

  private persistUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getStoredUser(): User | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }
}
