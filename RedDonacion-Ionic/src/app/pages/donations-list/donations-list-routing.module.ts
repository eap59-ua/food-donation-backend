import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonationsListPage } from './donations-list.page';

const routes: Routes = [
  {
    path: '',
    component: DonationsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationsListPageRoutingModule {}
