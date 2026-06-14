import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { AidRequest, Donation, RequestStatus } from '../../core/models';
import { formatDate, requestStatusLabel, statusPillClass } from '../../core/format';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
  standalone: false
})
export class RequestDetailPage implements OnInit {
  request: AidRequest | null = null;
  donation: Donation | null = null;
  loading = true;
  updating = false;
  error = '';

  protected readonly formatDate = formatDate;
  protected readonly requestStatusLabel = requestStatusLabel;
  protected readonly statusPillClass = statusPillClass;

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService, public readonly auth: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Solicitud no encontrada.';
      this.loading = false;
      return;
    }
    this.api.myRequests().pipe(
      map(requests => requests.find(item => item.id === id) ?? null),
      switchMap(request => {
        this.request = request;
        if (!request) return of(null);
        return forkJoin({
          request: of(request),
          donation: this.api.getDonation(request.donation_id).pipe(catchError(() => of(null)))
        });
      })
    ).subscribe({
      next: result => {
        if (!result) {
          this.error = 'No se encontró esta solicitud en tu cuenta.';
          return;
        }
        this.request = result.request;
        this.donation = result.donation;
      },
      error: () => this.error = 'No se ha podido cargar la solicitud.',
      complete: () => this.loading = false
    });
  }

  canApprove(): boolean {
    const role = this.auth.user?.role;
    return role === 'DONANTE' || role === 'ADMIN';
  }

  updateStatus(status: RequestStatus): void {
    if (!this.request) return;
    this.updating = true;
    this.api.updateRequestStatus(this.request.id, status).subscribe({
      next: updated => this.request = updated,
      error: (err) => this.error = err?.error?.detail || 'No se ha podido actualizar la solicitud.',
      complete: () => this.updating = false
    });
  }
}
