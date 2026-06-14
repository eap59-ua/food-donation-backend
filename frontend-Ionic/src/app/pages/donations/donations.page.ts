import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ApiService } from '../../core/api.service';
import { Donation } from '../../core/models';
import { donationStatusLabel, formatDate, statusPillClass } from '../../core/format';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, TopbarComponent],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.scss'
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
