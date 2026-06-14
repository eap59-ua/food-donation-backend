import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MyRequestsPageRoutingModule } from './my-requests-routing.module';
import { MyRequestsPage } from './my-requests.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    MyRequestsPageRoutingModule,
  ],
  declarations: [MyRequestsPage],
})
export class MyRequestsPageModule {}
