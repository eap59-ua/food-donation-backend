import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';

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
  role: 'DONANTE' | 'RECEPTOR' | 'ONG';
  is_active: boolean;
  created_at: string;
}

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  private _currentUser$ = new BehaviorSubject<UserResponseDTO | null>(null);
  public currentUser$ = this._currentUser$.asObservable();

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  private _isLoading$ = new BehaviorSubject<boolean>(true);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {}

  /** Must be called once on app init (after storage is ready) */
  async init(): Promise<void> {
    await this.storage.create();
    const token = await this.storage.get(TOKEN_KEY);
    if (token) {
      try {
        const decoded = this.decodeToken(token);
        if (decoded.exp * 1000 > Date.now()) {
          this._isAuthenticated$.next(true);
          // optionally fetch full user
          await this.fetchMe().toPromise();
        } else {
          await this.clearToken();
        }
      } catch {
        await this.clearToken();
      }
    }
    this._isLoading$.next(false);
  }

  login(data: LoginRequestDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.apiUrl}/auth/login`, data).pipe(
      switchMap((res) => from(this.storage.set(TOKEN_KEY, res.access_token)).pipe(map(() => res))),
      tap(() => this._isAuthenticated$.next(true)),
      switchMap((res) => this.fetchMe().pipe(map(() => res)))
    );
  }

  register(data: RegisterUserDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/auth/register`, data);
  }

  fetchMe(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/auth/me`).pipe(
      tap((user) => this._currentUser$.next(user)),
      catchError((err) => {
        this.clearToken();
        return throwError(() => err);
      })
    );
  }

  async logout(): Promise<void> {
    await this.clearToken();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  async getToken(): Promise<string | null> {
    return this.storage.get(TOKEN_KEY);
  }

  get currentUser(): UserResponseDTO | null {
    return this._currentUser$.value;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.value;
  }

  private async clearToken(): Promise<void> {
    await this.storage.remove(TOKEN_KEY);
    this._isAuthenticated$.next(false);
    this._currentUser$.next(null);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
