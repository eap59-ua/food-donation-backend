import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  RequestsService,
  DonationRequestDTO,
} from '../../services/requests.service';

import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.page.html',
  styleUrls: ['./my-requests.page.scss'],
  standalone: false,
})
export class MyRequestsPage implements OnInit {
  requests: DonationRequestDTO[] = [];
  isLoading = true;
  isAdmin = false;

  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.currentUser?.role === 'ADMIN';
    this.loadRequests();
  }

  ionViewWillEnter() {
    this.isAdmin = this.authService.currentUser?.role === 'ADMIN';
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

  updateRequestStatus(e: Event, reqId: string, status: 'APPROVED' | 'REJECTED') {
    e.stopPropagation();
    this.requestsService.updateStatus(reqId, status).subscribe({
      next: () => this.loadRequests(),
      error: async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo actualizar la solicitud.',
          buttons: ['OK']
        });
        await alert.present();
      }
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
