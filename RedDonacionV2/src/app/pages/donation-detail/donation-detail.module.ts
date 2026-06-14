import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationDetailPageRoutingModule } from './donation-detail-routing.module';

import { DonationDetailPage } from './donation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationDetailPageRoutingModule
  ],
  declarations: [DonationDetailPage]
})
export class DonationDetailPageModule {}
