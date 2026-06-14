import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestSuccessPageRoutingModule } from './request-success-routing.module';

import { RequestSuccessPage } from './request-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestSuccessPageRoutingModule
  ],
  declarations: [RequestSuccessPage]
})
export class RequestSuccessPageModule {}
