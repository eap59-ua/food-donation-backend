import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login'], { replaceUrl: true });
          return false;
        }

        const requiredRoles: string[] = route.data['roles'] ?? [];
        const currentRole = this.authService.currentUser?.role ?? '';

        if (requiredRoles.length > 0 && !requiredRoles.includes(currentRole)) {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
          return false;
        }

        return true;
      })
    );
  }
}
