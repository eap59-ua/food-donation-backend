import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Donation } from '../../core/models';
import { donationStatusLabel, formatDate, statusPillClass } from '../../core/format';

@Component({
  selector: 'app-request-new',
  templateUrl: './request-new.page.html',
  styleUrls: ['./request-new.page.scss'],
  standalone: false
})
export class RequestNewPage implements OnInit {
  donation: Donation | null = null;
  requestedQuantity = '';
  message = '';
  loading = true;
  sending = false;
  error = '';

  protected readonly formatDate = formatDate;
  protected readonly donationStatusLabel = donationStatusLabel;
  protected readonly statusPillClass = statusPillClass;

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService, private readonly router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('donationId');
    if (!id) {
      this.error = 'No se ha indicado la donación.';
      this.loading = false;
      return;
    }
    this.api.getDonation(id).subscribe({
      next: donation => {
        this.donation = donation;
        this.requestedQuantity = donation.quantity;
      },
      error: () => this.error = 'No se ha podido cargar la donación.',
      complete: () => this.loading = false
    });
  }

  submit(): void {
    this.error = '';
    if (!this.donation) return;
    this.sending = true;
    this.api.createRequest({
      donation_id: this.donation.id,
      requested_quantity: this.requestedQuantity || null,
      message: this.message || null
    }).subscribe({
      next: () => this.router.navigate(['/tabs/requests/success']),
      error: (err) => {
        this.sending = false;
        this.error = err?.error?.detail || 'No se ha podido enviar la solicitud. Revisa que tu usuario sea RECEPTOR/ONG y que no sea tu propia donación.';
      },
      complete: () => this.sending = false
    });
  }
}
