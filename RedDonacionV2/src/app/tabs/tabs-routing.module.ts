import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'donations',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/donations/donations.module').then(m => m.DonationsPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('../pages/donation-new/donation-new.module').then(m => m.DonationNewPageModule)
          },
          {
            path: 'shared',
            loadChildren: () => import('../pages/donation-shared/donation-shared.module').then(m => m.DonationSharedPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/donation-detail/donation-detail.module').then(m => m.DonationDetailPageModule)
          }
        ]
      },
      {
        path: 'requests',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/requests/requests.module').then(m => m.RequestsPageModule)
          },
          {
            path: 'new/:donationId',
            loadChildren: () => import('../pages/request-new/request-new.module').then(m => m.RequestNewPageModule)
          },
          {
            path: 'success',
            loadChildren: () => import('../pages/request-success/request-success.module').then(m => m.RequestSuccessPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../pages/request-detail/request-detail.module').then(m => m.RequestDetailPageModule)
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
