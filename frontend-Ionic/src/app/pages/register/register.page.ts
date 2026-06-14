import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AuthService } from '../../core/auth.service';
import { UserRole } from '../../core/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss'
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
    const payload = { name: this.name, email: this.email, password: this.password, role: this.role };
    this.auth.register(payload).subscribe({
      next: () => {
        this.success = 'Cuenta creada. Iniciando sesión...';
        this.auth.login({ email: this.email, password: this.password }).subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: () => this.router.navigate(['/login'])
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.detail || 'No se ha podido crear la cuenta. Revisa el backend y los datos.';
      },
      complete: () => this.loading = false
    });
  }
}
