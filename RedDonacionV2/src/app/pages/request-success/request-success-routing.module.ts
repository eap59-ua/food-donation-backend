import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestSuccessPage } from './request-success.page';

const routes: Routes = [
  {
    path: '',
    component: RequestSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestSuccessPageRoutingModule {}
