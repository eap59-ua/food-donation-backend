import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-donation-new',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, TopbarComponent],
  templateUrl: './donation-new.page.html',
  styleUrl: './donation-new.page.scss'
})
export class DonationNewPage {
  title = '';
  quantity = '';
  locationAddress = '';
  expirationDate = '';
  description = '';
  loading = false;
  error = '';

  constructor(private readonly api: ApiService, public readonly auth: AuthService, private readonly router: Router) {}

  canCreate(): boolean {
    const role = this.auth.user?.role;
    return role === 'DONANTE' || role === 'ADMIN';
  }

  submit(): void {
    this.error = '';
    if (!this.title || !this.quantity || !this.locationAddress) {
      this.error = 'Rellena título, cantidad y ubicación.';
      return;
    }
    this.loading = true;
    this.api.createDonation({
      title: this.title,
      quantity: this.quantity,
      location_address: this.locationAddress,
      description: this.description || null,
      expiration_date: this.expirationDate ? new Date(this.expirationDate).toISOString() : null
    }).subscribe({
      next: () => this.router.navigate(['/donations/shared']),
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.detail || 'No se ha podido publicar la donación. Revisa que tu usuario sea DONANTE.';
      },
      complete: () => this.loading = false
    });
  }
}
