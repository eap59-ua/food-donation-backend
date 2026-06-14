import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { AidRequest, Donation, RequestStatus } from '../../core/models';
import { formatDate, requestStatusLabel, statusPillClass } from '../../core/format';

interface RequestVM extends AidRequest {
  donation?: Donation | null;
}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './requests.page.html',
  styleUrl: './requests.page.scss'
})
export class RequestsPage implements OnInit {
  requests: RequestVM[] = [];
  loading = true;
  error = '';
  updatingId = '';

  protected readonly formatDate = formatDate;
  protected readonly requestStatusLabel = requestStatusLabel;
  protected readonly statusPillClass = statusPillClass;

  constructor(private readonly api: ApiService, public readonly auth: AuthService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.myRequests().pipe(
      switchMap(requests => {
        if (!requests.length) return of([] as RequestVM[]);
        const items = requests.map(req => this.api.getDonation(req.donation_id).pipe(
          map(donation => ({ ...req, donation })),
          catchError(() => of({ ...req, donation: null }))
        ));
        return forkJoin(items);
      })
    ).subscribe({
      next: vm => this.requests = vm,
      error: (err) => this.error = err?.error?.detail || 'No se han podido cargar las solicitudes.',
      complete: () => this.loading = false
    });
  }

  canApprove(): boolean {
    const role = this.auth.user?.role;
    return role === 'DONANTE' || role === 'ADMIN';
  }

  updateStatus(request: RequestVM, status: RequestStatus): void {
    this.updatingId = request.id;
    this.api.updateRequestStatus(request.id, status).subscribe({
      next: updated => Object.assign(request, updated),
      error: (err) => this.error = err?.error?.detail || 'No se ha podido actualizar la solicitud.',
      complete: () => this.updatingId = ''
    });
  }
}
