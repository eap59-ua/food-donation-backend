import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationsListPageRoutingModule } from './donations-list-routing.module';

import { DonationsListPage } from './donations-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationsListPageRoutingModule
  ],
  declarations: [DonationsListPage]
})
export class DonationsListPageModule {}
