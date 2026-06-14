import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationSharedPage } from './donation-shared.page';

const routes: Routes = [
  {
    path: '',
    component: DonationSharedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationSharedPageRoutingModule {}
