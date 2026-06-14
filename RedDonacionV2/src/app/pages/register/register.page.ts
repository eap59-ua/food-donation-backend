import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserRole } from '../../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  role: UserRole = 'RECEPTOR';
  loading = false;
  error = '';
  success = '';

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  submit(): void {
    this.error = '';
    this.success = '';
    if (!this.name || !this.email || !this.password) {
      this.error = 'Rellena nombre, correo y contraseña.';
      return;
    }
    this.loading = true;
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
      next: () => {
        this.success = 'Cuenta creada. Iniciando sesión...';
        this.auth.login({ email: this.email, password: this.password }).subscribe({
          next: () => this.router.navigate(['/tabs/dashboard']),
          error: () => this.router.navigate(['/login'])
        });
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.detail || 'No se ha podido crear la cuenta.';
      },
      complete: () => this.loading = false
    });
  }
}
