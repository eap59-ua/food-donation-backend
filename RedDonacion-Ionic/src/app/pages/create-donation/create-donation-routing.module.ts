import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDonationPage } from './create-donation.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDonationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDonationPageRoutingModule {}
