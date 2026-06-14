import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing.page').then(m => m.LandingPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'donations', canActivate: [authGuard], loadComponent: () => import('./pages/donations/donations.page').then(m => m.DonationsPage) },
  { path: 'donations/new', canActivate: [authGuard], loadComponent: () => import('./pages/donation-new/donation-new.page').then(m => m.DonationNewPage) },
  { path: 'donations/shared', canActivate: [authGuard], loadComponent: () => import('./pages/donation-shared/donation-shared.page').then(m => m.DonationSharedPage) },
  { path: 'donations/:id', canActivate: [authGuard], loadComponent: () => import('./pages/donation-detail/donation-detail.page').then(m => m.DonationDetailPage) },
  { path: 'requests', canActivate: [authGuard], loadComponent: () => import('./pages/requests/requests.page').then(m => m.RequestsPage) },
  { path: 'requests/new/:donationId', canActivate: [authGuard], loadComponent: () => import('./pages/request-new/request-new.page').then(m => m.RequestNewPage) },
  { path: 'requests/success', canActivate: [authGuard], loadComponent: () => import('./pages/request-success/request-success.page').then(m => m.RequestSuccessPage) },
  { path: 'requests/:id', canActivate: [authGuard], loadComponent: () => import('./pages/request-detail/request-detail.page').then(m => m.RequestDetailPage) },
  { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage) },
  { path: '**', redirectTo: '' }
];
