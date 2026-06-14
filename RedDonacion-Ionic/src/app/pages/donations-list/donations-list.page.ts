import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DonationsService,
  DonationDTO,
  DonationStatus,
} from '../../services/donations.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-donations-list',
  templateUrl: './donations-list.page.html',
  styleUrls: ['./donations-list.page.scss'],
  standalone: false,
})
export class DonationsListPage implements OnInit {
  donations: DonationDTO[] = [];
  filteredDonations: DonationDTO[] = [];
  isLoading = true;
  searchText = '';
  selectedStatus: DonationStatus | '' = '';

  statusOptions = [
    { label: 'Todas', value: '' },
    { label: 'Disponibles', value: 'AVAILABLE' },
    { label: 'Reservadas', value: 'RESERVED' },
    { label: 'Completadas', value: 'COMPLETED' },
    { label: 'Caducadas', value: 'EXPIRED' },
  ];

  constructor(
    private donationsService: DonationsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDonations();
  }

  ionViewWillEnter() {
    this.loadDonations();
  }

  loadDonations() {
    this.isLoading = true;
    const status = this.selectedStatus as DonationStatus | undefined;
    this.donationsService.getAll(status || undefined).subscribe({
      next: (data) => {
        this.donations = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onSearchChange(event: any) {
    this.searchText = event.detail.value ?? '';
    this.applyFilters();
  }

  onStatusChange(status: DonationStatus | '') {
    this.selectedStatus = status;
    this.loadDonations();
  }

  applyFilters() {
    const search = this.searchText.toLowerCase().trim();
    this.filteredDonations = this.donations.filter((d) => {
      const matchSearch =
        !search ||
        d.title.toLowerCase().includes(search) ||
        d.description.toLowerCase().includes(search);
      return matchSearch;
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/donation-detail', id]);
  }

  canDonate(): boolean {
    const role = this.authService.currentUser?.role;
    return role === 'DONANTE';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      AVAILABLE: 'Disponible',
      RESERVED: 'Reservada',
      COMPLETED: 'Completada',
      EXPIRED: 'Caducada',
    };
    return map[status] ?? status;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  doRefresh(event: any) {
    this.loadDonations();
    setTimeout(() => event.target.complete(), 800);
  }
}
