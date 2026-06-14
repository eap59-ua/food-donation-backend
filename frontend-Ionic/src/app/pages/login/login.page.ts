import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonItem, IonInput, IonButton, IonIcon, IonAlert, RouterModule, TopbarComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  formLogin: FormGroup;
  loading = false;
  error = '';

  constructor(
    private readonly auth: AuthService, 
    private readonly router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
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
    
    let email = this.formLogin.get('email')?.value;
    let password = this.formLogin.get('password')?.value;

    this.auth.login({ email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.detail || 'No se ha podido iniciar sesión. Comprueba tus credenciales.';
      },
      complete: () => this.loading = false
    });
  }
}