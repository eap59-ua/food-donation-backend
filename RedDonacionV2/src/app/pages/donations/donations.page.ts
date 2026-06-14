import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Donation } from '../../core/models';
import { donationStatusLabel, formatDate, statusPillClass } from '../../core/format';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.page.html',
  styleUrls: ['./donations.page.scss'],
  standalone: false
})
export class DonationsPage implements OnInit {
  donations: Donation[] = [];
  loading = true;
  location = '';
  error = '';

  protected readonly formatDate = formatDate;
  protected readonly donationStatusLabel = donationStatusLabel;
  protected readonly statusPillClass = statusPillClass;

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.listDonations({ location: this.location.trim() || undefined }).subscribe({
      next: donations => this.donations = donations,
      error: (err) => this.error = err?.error?.detail || 'No se han podido cargar las donaciones.',
      complete: () => this.loading = false
    });
  }

  clearSearch(): void {
    this.location = '';
    this.load();
  }
}
