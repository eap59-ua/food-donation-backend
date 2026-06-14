import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPage } from './admin.page';
import { AdminPageRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminPage],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, AdminPageRoutingModule],
})
export class AdminPageModule {}
