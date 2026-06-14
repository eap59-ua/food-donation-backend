import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginPayload, RegisterPayload, TokenResponse, User } from './models';
import { StorageService } from './storage.service';
import { MOCK_USER } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'red_donacion_access_token';
  private readonly userKey = 'red_donacion_user';
  private readonly apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  readonly user$ = this.userSubject.asObservable();
  private _token: string | null = null;

  constructor(private readonly http: HttpClient, private readonly storageService: StorageService) {}

  get token(): string | null {
    return this._token;
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  async restoreSession(): Promise<void> {
    await this.storageService.init();
    this._token = await this.storageService.get(this.tokenKey);
    const userRaw = await this.storageService.get(this.userKey);
    if (userRaw) {
      try {
        this.userSubject.next(typeof userRaw === 'string' ? JSON.parse(userRaw) : userRaw);
      } catch { /* ignore */ }
    }
    if (this._token) {
      this.me().subscribe({
        error: () => {
          if (!environment.useMockOnApiError) this.logoutAsync();
        }
      });
    }
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/auth/register`, payload).pipe(
      switchMap(user => from(this.persistUser(user)).pipe(map(() => user)))
    );
  }

  login(payload: LoginPayload): Observable<User> {
    return this.http.post<TokenResponse>(`${this.apiBaseUrl}/auth/login`, payload).pipe(
      switchMap(tokenResp =>
        from(this.storageService.set(this.tokenKey, tokenResp.access_token)).pipe(
          tap(() => (this._token = tokenResp.access_token)),
          switchMap(() => this.me())
        )
      )
    );
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.apiBaseUrl}/auth/me`, this.authOptions()).pipe(
      switchMap(user => from(this.persistUser(user)).pipe(map(() => user))),
      catchError(error => {
        if (environment.useMockOnApiError && this._token) {
          const stored = this.userSubject.value ?? MOCK_USER;
          this.persistUser(stored);
          return of(stored);
        }
        return throwError(() => error);
      })
    );
  }

  async logoutAsync(): Promise<void> {
    await this.storageService.remove(this.tokenKey);
    await this.storageService.remove(this.userKey);
    this._token = null;
    this.userSubject.next(null);
  }

  logout(redirect = true): void {
    this.logoutAsync().then(() => {
      if (redirect) window.location.href = '/login';
    });
  }

  authOptions(): { headers: HttpHeaders } {
    return {
      headers: this._token
        ? new HttpHeaders({ Authorization: `Bearer ${this._token}` })
        : new HttpHeaders()
    };
  }

  private async persistUser(user: User): Promise<void> {
    await this.storageService.set(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }
}
