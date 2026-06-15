import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { DonationsService, DonationDTO } from '../../services/donations.service';
import { RequestsService, DonationRequestDTO } from '../../services/requests.service';
import { UserResponseDTO } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  users: UserResponseDTO[] = [];
  donations: DonationDTO[] = [];
  requests: DonationRequestDTO[] = [];

  loading = false;

  // Modals state
  isUserModalOpen = false;
  isRequestModalOpen = false;
  isDonationModalOpen = false;

  // Forms
  userForm: FormGroup;
  requestForm: FormGroup;
  donationForm: FormGroup;

  // Editing state
  editingUser: UserResponseDTO | null = null;
  editingRequest: DonationRequestDTO | null = null;

  showPassword = false;

  isViewUserModalOpen = false;
  isViewRequestModalOpen = false;
  viewingUser: UserResponseDTO | null = null;
  viewingRequest: DonationRequestDTO | null = null;

  availableDonations: DonationDTO[] = [];
  availableDonors: UserResponseDTO[] = [];

  constructor(
    private usersService: UsersService,
    private donationsService: DonationsService,
    private requestsService: RequestsService,
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['RECEPTOR', Validators.required],
      password: ['']
    });

    this.requestForm = this.fb.group({
      donation_id: ['', Validators.required],
      message: [''],
      requested_quantity: [''],
      status: ['PENDING', Validators.required]
    });

    this.donationForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      location_address: ['', Validators.required],
      expiration_date: [''],
      donor_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.usersService.getAll().subscribe({ 
      next: (u) => {
        this.users = u;
        this.availableDonors = u.filter(user => user.role === 'DONANTE' || user.role === 'ADMIN');
      }, 
      error: () => {}, 
      complete: () => (this.loading = false) 
    });
    this.donationsService.getAll().subscribe({ 
      next: (d) => {
        this.donations = d;
        this.availableDonations = d.filter(don => don.status === 'AVAILABLE');
      }, 
      error: () => {} 
    });
    this.requestsService.getAll().subscribe({ next: (r) => (this.requests = r), error: () => {} });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Users
  openUserModal(user?: UserResponseDTO) {
    this.editingUser = user || null;
    this.userForm.reset();
    if (user) {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
        password: ''
      });
      this.userForm.get('password')?.clearValidators();
    } else {
      this.userForm.patchValue({ role: 'RECEPTOR' });
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    this.userForm.get('password')?.updateValueAndValidity();
    this.isUserModalOpen = true;
  }

  closeUserModal() {
    this.isUserModalOpen = false;
    this.editingUser = null;
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    
    const val = this.userForm.value;
    if (this.editingUser) {
      const updateData = { name: val.name, role: val.role };
      this.usersService.update(this.editingUser.id, updateData).subscribe({
        next: () => {
          this.loadAll();
          this.closeUserModal();
        },
        error: async (err) => {
          const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo actualizar el usuario.', buttons: ['OK'] });
          await alert.present();
        }
      });
    } else {
      this.usersService.create(val).subscribe({
        next: () => {
          this.loadAll();
          this.closeUserModal();
        },
        error: async (err) => {
          const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo crear el usuario. Verifique los datos o si el correo ya existe.', buttons: ['OK'] });
          await alert.present();
        }
      });
    }
  }

  async deleteUser(u: UserResponseDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Borrar usuario? Esto borrará sus donaciones y solicitudes también.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Borrar', 
          role: 'destructive',
          handler: () => {
            if (typeof (this.usersService as any).delete === 'function') {
              (this.usersService as any).delete(u.id).subscribe({ next: () => this.loadAll(), error: () => {
                this.alertController.create({ header: 'Error', message: 'No se pudo borrar.', buttons: ['OK'] }).then(a => a.present());
              } });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  viewUser(u: UserResponseDTO) {
    this.viewingUser = u;
    this.isViewUserModalOpen = true;
  }

  closeViewUserModal() {
    this.isViewUserModalOpen = false;
    this.viewingUser = null;
  }

  // Donations
  getDonationStatusLabel(status: string): string {
    const map: Record<string, string> = {
      AVAILABLE: 'Disponible',
      RESERVED: 'Reservada',
      COMPLETED: 'Completada',
      EXPIRED: 'Caducada',
    };
    return map[status] ?? status;
  }

  openDonationModal() {
    this.donationForm.reset();
    this.isDonationModalOpen = true;
  }

  closeDonationModal() {
    this.isDonationModalOpen = false;
  }

  saveDonation() {
    if (this.donationForm.invalid) {
      this.donationForm.markAllAsTouched();
      return;
    }

    const formValues = this.donationForm.value;
    const dto: any = {
      title: formValues.title,
      description: formValues.description,
      quantity: formValues.quantity,
      location_address: formValues.location_address,
      donor_id: formValues.donor_id,
      expiration_date: formValues.expiration_date ? new Date(formValues.expiration_date).toISOString() : null,
    };

    this.donationsService.create(dto).subscribe({
      next: () => {
        this.loadAll();
        this.closeDonationModal();
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo crear la donación. Verifique los datos.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  viewDonation(d: DonationDTO) {
    this.router.navigate(['/donation-detail', d.id], { state: { returnUrl: '/admin' } });
  }

  async deleteDonation(d: DonationDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Borrar donación?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Borrar', 
          role: 'destructive',
          handler: () => {
            this.donationsService.delete(d.id).subscribe({ next: () => this.loadAll() });
          }
        }
      ]
    });
    await alert.present();
  }

  // Requests
  getRequestStatusLabel(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'Pendiente',
      APPROVED: 'Aprobada',
      REJECTED: 'Rechazada',
    };
    return map[status] ?? status;
  }
  openRequestModal(req?: DonationRequestDTO) {
    this.editingRequest = req || null;
    this.requestForm.reset();
    if (req) {
      this.requestForm.patchValue({
        donation_id: req.donation_id,
        message: req.message,
        requested_quantity: req.requested_quantity,
        status: req.status
      });
    } else {
      this.requestForm.patchValue({ status: 'PENDING' });
    }
    this.isRequestModalOpen = true;
  }

  closeRequestModal() {
    this.isRequestModalOpen = false;
    this.editingRequest = null;
  }

  approveRequest(r: DonationRequestDTO) {
    this.requestsService.updateStatus(r.id, 'APPROVED').subscribe({
      next: () => this.loadAll(),
      error: async () => {
        const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo aprobar la solicitud.', buttons: ['OK'] });
        await alert.present();
      }
    });
  }

  rejectRequest(r: DonationRequestDTO) {
    this.requestsService.updateStatus(r.id, 'REJECTED').subscribe({
      next: () => this.loadAll(),
      error: async () => {
        const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo rechazar la solicitud.', buttons: ['OK'] });
        await alert.present();
      }
    });
  }

  saveRequest() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const val = this.requestForm.value;
    if (this.editingRequest) {
      this.requestsService.updateStatus(this.editingRequest.id, val.status).subscribe({
        next: () => {
          this.loadAll();
          this.closeRequestModal();
        },
        error: async () => {
          const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo actualizar el estado.', buttons: ['OK'] });
          await alert.present();
        }
      });
    } else {
      this.requestsService.create({
        donation_id: val.donation_id,
        message: val.message,
        requested_quantity: val.requested_quantity
      }).subscribe({
        next: () => {
          this.loadAll();
          this.closeRequestModal();
        },
        error: async (err) => {
          const alert = await this.alertController.create({ header: 'Error', message: 'No se pudo crear. Asegúrese de que el ID de la donación sea un UUID válido y exista.', buttons: ['OK'] });
          await alert.present();
        }
      });
    }
  }

  async deleteRequest(r: DonationRequestDTO) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Borrar solicitud?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Borrar', 
          role: 'destructive',
          handler: () => {
            this.requestsService.delete(r.id).subscribe({ next: () => this.loadAll(), error: () => {
              this.alertController.create({ header: 'Error', message: 'No se pudo borrar.', buttons: ['OK'] }).then(a => a.present());
            } });
          }
        }
      ]
    });
    await alert.present();
  }

  viewRequest(r: DonationRequestDTO) {
    this.viewingRequest = r;
    this.isViewRequestModalOpen = true;
  }

  closeViewRequestModal() {
    this.isViewRequestModalOpen = false;
    this.viewingRequest = null;
  }
}
