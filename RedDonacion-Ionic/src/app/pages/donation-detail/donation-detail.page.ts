import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {
  DonationsService,
  DonationDTO,
  DonationStatus,
} from '../../services/donations.service';
import {
  RequestsService,
  DonationRequestDTO,
} from '../../services/requests.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.page.html',
  styleUrls: ['./donation-detail.page.scss'],
  standalone: false,
})
export class DonationDetailPage implements OnInit {
  donation: DonationDTO | null = null;
  requests: DonationRequestDTO[] = [];
  isLoading = true;
  isRequesting = false;
  hasRequested = false;
  requestMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donationsService: DonationsService,
    private requestsService: RequestsService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDonation(id);
    }
  }

  loadDonation(id: string) {
    this.isLoading = true;
    this.donationsService.getById(id).subscribe({
      next: (data) => {
        this.donation = data;
        this.isLoading = false;
        // If owner, load requests for this donation
        if (this.isOwner()) {
          this.loadRequests(id);
        }
      },
      error: () => {
        this.isLoading = false;
        this.showToast('Error al cargar la donación', 'danger');
      },
    });
  }

  loadRequests(donationId: string) {
    this.requestsService.getMyRequests().subscribe({
      next: (reqs) => {
        this.requests = reqs.filter((r) => r.donation_id === donationId);
      },
    });
  }

  async requestDonation() {
    const alert = await this.alertCtrl.create({
      header: 'Solicitar Donación',
      message: 'Escribe un mensaje al donante:',
      inputs: [
        {
          name: 'message',
          type: 'textarea',
          placeholder: 'Ej: Somos una familia de 4 personas...',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Enviar',
          handler: (data) => {
            if (!data.message?.trim()) return false;
            this.submitRequest(data.message);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  submitRequest(message: string) {
    if (!this.donation) return;
    this.isRequesting = true;
    this.requestsService
      .create({ donation_id: this.donation.id, message })
      .subscribe({
        next: () => {
          this.isRequesting = false;
          this.hasRequested = true;
          this.showToast('Solicitud enviada correctamente', 'success');
        },
        error: () => {
          this.isRequesting = false;
          this.showToast('Error al enviar la solicitud', 'danger');
        },
      });
  }

  async updateRequestStatus(requestId: string, status: 'APPROVED' | 'REJECTED') {
    this.requestsService.updateStatus(requestId, status).subscribe({
      next: () => {
        const req = this.requests.find((r) => r.id === requestId);
        if (req) req.status = status;
        this.showToast(
          status === 'APPROVED' ? 'Solicitud aceptada' : 'Solicitud rechazada',
          status === 'APPROVED' ? 'success' : 'warning'
        );
      },
      error: () => this.showToast('Error al actualizar el estado', 'danger'),
    });
  }

  async deleteDonation() {
    if (!this.donation) return;
    const alert = await this.alertCtrl.create({
      header: 'Eliminar donación',
      message: '¿Estás seguro? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.donationsService.delete(this.donation!.id).subscribe({
              next: () => {
                this.showToast('Donación eliminada', 'success');
                this.router.navigate(['/donations-list'], { replaceUrl: true });
              },
              error: () => this.showToast('Error al eliminar', 'danger'),
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async markCompleted() {
    if (!this.donation) return;
    this.donationsService
      .updateStatus(this.donation.id, 'COMPLETED')
      .subscribe({
        next: (updated) => {
          this.donation = updated;
          this.showToast('Donación marcada como completada', 'success');
        },
        error: () => this.showToast('Error al actualizar', 'danger'),
      });
  }

  isOwner(): boolean {
    const user = this.authService.currentUser;
    return !!user && !!this.donation && user.id === this.donation.donor_id;
  }

  isReceptorOrOng(): boolean {
    const role = this.authService.currentUser?.role;
    return role === 'RECEPTOR' || role === 'ONG';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      AVAILABLE: 'Disponible',
      RESERVED: 'Reservada',
      COMPLETED: 'Completada',
      EXPIRED: 'Caducada',
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
      month: 'long',
      year: 'numeric',
    });
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' = 'success'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
