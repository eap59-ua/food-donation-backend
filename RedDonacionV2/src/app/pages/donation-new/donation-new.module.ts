import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationNewPageRoutingModule } from './donation-new-routing.module';

import { DonationNewPage } from './donation-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationNewPageRoutingModule
  ],
  declarations: [DonationNewPage]
})
export class DonationNewPageModule {}
