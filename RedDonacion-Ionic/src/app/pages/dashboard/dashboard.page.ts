import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserResponseDTO } from '../../services/auth.service';
import { DonationsService, DonationDTO } from '../../services/donations.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  currentUser: UserResponseDTO | null = null;
  recentDonations: DonationDTO[] = [];
  isLoading = true;

  stats = {
    total: 0,
    pending: 0,
    completed: 0,
  };

  constructor(
    private authService: AuthService,
    private donationsService: DonationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.donationsService.getAll().subscribe({
      next: (donations) => {
        this.stats.total = donations.length;
        this.stats.pending = donations.filter((d) => d.status === 'AVAILABLE').length;
        this.stats.completed = donations.filter(
          (d) => d.status === 'COMPLETED'
        ).length;
        this.recentDonations = donations.slice(0, 5);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  goToDonation(id: string) {
    this.router.navigate(['/donation-detail', id]);
  }

  goToList() {
    this.router.navigate(['/donations-list']);
  }

  goToCreate() {
    this.router.navigate(['/create-donation']);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
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
    });
  }

  canDonate(): boolean {
    return this.currentUser?.role === 'DONANTE';
  }
}
