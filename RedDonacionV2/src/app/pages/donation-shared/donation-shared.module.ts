import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationSharedPageRoutingModule } from './donation-shared-routing.module';

import { DonationSharedPage } from './donation-shared.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationSharedPageRoutingModule
  ],
  declarations: [DonationSharedPage]
})
export class DonationSharedPageModule {}
