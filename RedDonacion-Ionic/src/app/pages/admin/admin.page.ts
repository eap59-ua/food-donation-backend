import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { DonationsService, DonationDTO } from '../../services/donations.service';
import { RequestsService, DonationRequestDTO } from '../../services/requests.service';
import { UserResponseDTO } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private usersService: UsersService,
    private donationsService: DonationsService,
    private requestsService: RequestsService
    , private router: Router
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.usersService.getAll().subscribe({ next: (u) => (this.users = u), error: () => {}, complete: () => (this.loading = false) });
    this.donationsService.getAll().subscribe({ next: (d) => (this.donations = d), error: () => {} });
    this.requestsService.getAll().subscribe({ next: (r) => (this.requests = r), error: () => {} });
  }

  // Users
  async createUser() {
    const name = prompt('Nombre:');
    if (!name) return;
    const email = prompt('Email:');
    if (!email) return;
    const password = prompt('Password:');
    if (!password) return;
    const role = prompt('Role (DONANTE|RECEPTOR|ONG|ADMIN):', 'RECEPTOR') || 'RECEPTOR';
    this.usersService.create({ name, email, password, role }).subscribe({ next: () => this.loadAll() });
  }

  editUser(u: UserResponseDTO) {
    const name = prompt('Nombre:', u.name) || u.name;
    const role = prompt('Role (DONANTE|RECEPTOR|ONG|ADMIN):', u.role) || u.role;
    this.usersService.update(u.id, { name, role }).subscribe({ next: (res) => this.loadAll() });
  }

  viewUser(u: UserResponseDTO) {
    alert(`Usuario:\n${u.name} <${u.email}>\nRol: ${u.role}`);
  }

  // Donations
  viewDonation(d: DonationDTO) {
    this.router.navigate(['/donation-detail', d.id], { state: { returnUrl: '/admin' } });
  }

  async deleteDonation(d: DonationDTO) {
    if (!confirm('¿Borrar donación?')) return;
    this.donationsService.delete(d.id).subscribe({ next: () => this.loadAll() });
  }

  // Requests
  viewRequest(r: DonationRequestDTO) {
    alert(`Solicitud:\n${r.requester_name} -> ${r.donation_title}\nEstado: ${r.status}`);
  }

  async updateRequestStatus(r: DonationRequestDTO) {
    const s = prompt('Nuevo estado (PENDING|APPROVED|REJECTED):', r.status) as 'PENDING' | 'APPROVED' | 'REJECTED';
    if (!s) return;
    this.requestsService.updateStatus(r.id, s).subscribe({ next: () => this.loadAll() });
  }
}
