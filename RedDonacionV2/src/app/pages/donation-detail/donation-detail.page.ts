import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { Donation, DonationStatus } from '../../core/models';
import { donationStatusLabel, formatDate, statusPillClass } from '../../core/format';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.page.html',
  styleUrls: ['./donation-detail.page.scss'],
  standalone: false
})
export class DonationDetailPage implements OnInit {
  donation: Donation | null = null;
  loading = true;
  error = '';
  updating = false;

  protected readonly formatDate = formatDate;
  protected readonly donationStatusLabel = donationStatusLabel;
  protected readonly statusPillClass = statusPillClass;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    public readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Donación no encontrada.';
      this.loading = false;
      return;
    }
    this.api.getDonation(id).subscribe({
      next: donation => this.donation = donation,
      error: () => this.error = 'No se ha podido cargar la donación.',
      complete: () => this.loading = false
    });
  }

  canManage(): boolean {
    const role = this.auth.user?.role;
    return role === 'DONANTE' || role === 'ADMIN';
  }

  changeStatus(status: DonationStatus): void {
    if (!this.donation) return;
    this.updating = true;
    this.api.updateDonationStatus(this.donation.id, status).subscribe({
      next: donation => this.donation = donation,
      error: (err) => this.error = err?.error?.detail || 'No se pudo cambiar el estado.',
      complete: () => this.updating = false
    });
  }
}
