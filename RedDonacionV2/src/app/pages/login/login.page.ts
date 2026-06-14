import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  formLogin: FormGroup;
  loading = false;
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  doLogin(): void {
    this.error = '';
    if (this.formLogin.invalid) {
      this.error = 'Introduce un correo válido y la contraseña.';
      return;
    }
    this.loading = true;
    const { email, password } = this.formLogin.value;
    this.auth.login({ email, password }).subscribe({
      next: () => this.router.navigate(['/tabs/dashboard']),
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error?.detail || 'No se ha podido iniciar sesión. Comprueba tus credenciales.';
      },
      complete: () => this.loading = false
    });
  }
}
