import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestNewPageRoutingModule } from './request-new-routing.module';

import { RequestNewPage } from './request-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestNewPageRoutingModule
  ],
  declarations: [RequestNewPage]
})
export class RequestNewPageModule {}
