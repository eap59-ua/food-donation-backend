import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationDetailPage } from './donation-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DonationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationDetailPageRoutingModule {}
