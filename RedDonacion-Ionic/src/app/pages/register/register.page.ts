import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['RECEPTOR', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get nameCtrl()  { return this.form.get('name')!; }
  get emailCtrl() { return this.form.get('email')!; }
  get passCtrl()  { return this.form.get('password')!; }
  get roleCtrl()  { return this.form.get('role')!; }

  togglePassword() { this.showPassword = !this.showPassword; }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login'], { replaceUrl: true });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage =
          'Ocurrió un error al registrarte. Quizás el correo ya esté en uso.';
      },
    });
  }
}
