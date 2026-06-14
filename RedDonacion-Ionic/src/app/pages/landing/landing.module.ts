import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    LandingPageRoutingModule,
  ],
  declarations: [LandingPage],
})
export class LandingPageModule {}
