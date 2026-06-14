import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestNewPage } from './request-new.page';

const routes: Routes = [
  {
    path: '',
    component: RequestNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestNewPageRoutingModule {}
