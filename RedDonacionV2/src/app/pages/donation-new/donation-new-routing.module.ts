import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationNewPage } from './donation-new.page';

const routes: Routes = [
  {
    path: '',
    component: DonationNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationNewPageRoutingModule {}
