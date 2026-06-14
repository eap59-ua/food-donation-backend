import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CreateDonationPageRoutingModule } from './create-donation-routing.module';
import { CreateDonationPage } from './create-donation.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    CreateDonationPageRoutingModule,
  ],
  declarations: [CreateDonationPage],
})
export class CreateDonationPageModule {}
