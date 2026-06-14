import { AidRequest, Donation, User } from './models';

const now = new Date().toISOString();
const tomorrow = new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString();
const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_USER: User = {
  id: '00000000-0000-4000-8000-000000000001',
  name: 'Usuario RedDonación',
  email: 'demo@reddonacion.org',
  role: 'DONANTE',
  is_active: true,
  created_at: now
};

export const MOCK_DONATIONS: Donation[] = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    donor_id: '00000000-0000-4000-8000-000000000001',
    title: 'Lote de Fruta Fit',
    description: 'Fruta variada en perfecto estado, preparada para recoger durante el día.',
    quantity: '25 kg',
    location_address: 'Alicante centro',
    expiration_date: tomorrow,
    status: 'AVAILABLE',
    created_at: now,
    updated_at: now
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    donor_id: '00000000-0000-4000-8000-000000000002',
    title: 'Lote de lácteos',
    description: 'Yogures y productos refrigerados con caducidad próxima.',
    quantity: '18 cajas',
    location_address: 'San Vicente del Raspeig',
    expiration_date: nextWeek,
    status: 'AVAILABLE',
    created_at: now,
    updated_at: now
  }
];

export const MOCK_REQUESTS: AidRequest[] = [
  {
    id: '33333333-3333-4333-8333-333333333333',
    donation_id: MOCK_DONATIONS[0].id,
    requester_id: '00000000-0000-4000-8000-000000000003',
    message: 'Necesitamos fruta para familias del barrio esta semana.',
    requested_quantity: '10 kg',
    status: 'PENDING',
    created_at: now,
    updated_at: now
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    donation_id: MOCK_DONATIONS[1].id,
    requester_id: '00000000-0000-4000-8000-000000000004',
    message: 'Podemos recoger hoy por la tarde.',
    requested_quantity: '5 cajas',
    status: 'APPROVED',
    created_at: now,
    updated_at: now
  }
];
