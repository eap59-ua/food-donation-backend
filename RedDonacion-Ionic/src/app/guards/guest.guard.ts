import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * GuestGuard – Impide que usuarios ya autenticados accedan a /login o /register.
 * Si el usuario ya tiene sesión, lo redirige al dashboard.
 */
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
          return false;
        }
        return true;
      })
    );
  }
}
