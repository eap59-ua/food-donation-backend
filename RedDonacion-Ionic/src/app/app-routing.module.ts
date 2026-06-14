import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'donations-list',
    loadChildren: () =>
      import('./pages/donations-list/donations-list.module').then(
        (m) => m.DonationsListPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'donation-detail/:id',
    loadChildren: () =>
      import('./pages/donation-detail/donation-detail.module').then(
        (m) => m.DonationDetailPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-donation',
    loadChildren: () =>
      import('./pages/create-donation/create-donation.module').then(
        (m) => m.CreateDonationPageModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['DONANTE'] },
  },
  {
    path: 'my-requests',
    loadChildren: () =>
      import('./pages/my-requests/my-requests.module').then(
        (m) => m.MyRequestsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
