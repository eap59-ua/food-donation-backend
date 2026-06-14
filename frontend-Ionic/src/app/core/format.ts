import { DonationStatus, RequestStatus } from './models';

export function formatDate(value?: string | null): string {
  if (!value) return 'Sin fecha límite';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha límite';
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function donationStatusLabel(status?: DonationStatus): string {
  const map: Record<DonationStatus, string> = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservada',
    COMPLETED: 'Completada',
    EXPIRED: 'Caducada'
  };
  return status ? map[status] : 'Sin estado';
}

export function requestStatusLabel(status?: RequestStatus): string {
  const map: Record<RequestStatus, string> = {
    PENDING: 'Pendiente',
    APPROVED: 'Aprobada',
    REJECTED: 'Rechazada'
  };
  return status ? map[status] : 'Sin estado';
}

export function statusPillClass(status?: DonationStatus | RequestStatus): string {
  if (status === 'AVAILABLE' || status === 'APPROVED') return 'pill pill-green';
  if (status === 'REJECTED' || status === 'EXPIRED') return 'pill pill-red';
  if (status === 'PENDING' || status === 'RESERVED') return 'pill pill-orange';
  return 'pill pill-gray';
}

export function roleLabel(role?: string): string {
  const map: Record<string, string> = {
    DONANTE: 'Donante',
    RECEPTOR: 'Receptor',
    ONG: 'ONG',
    ADMIN: 'Administrador'
  };
  return role ? map[role] ?? role : 'Usuario';
}
