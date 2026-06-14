import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  RequestsService,
  DonationRequestDTO,
} from '../../services/requests.service';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
  standalone: false,
})
export class MyRequestsPage implements OnInit {
  requests: DonationRequestDTO[] = [];
  isLoading = true;

  constructor(
    private requestsService: RequestsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  ionViewWillEnter() {
    this.loadRequests();
  }

  loadRequests() {
    this.isLoading = true;
    this.requestsService.getMyRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  goToDonation(donationId: string) {
    this.router.navigate(['/donation-detail', donationId]);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'Pendiente',
      APPROVED: 'Aprobada',
      REJECTED: 'Rechazada',
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
    this.loadRequests();
    setTimeout(() => event.target.complete(), 800);
  }
}
