import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-donation-shared',
  standalone: true,
  imports: [IonicModule, RouterModule, TopbarComponent],
  templateUrl: './donation-shared.page.html',
  styleUrl: './donation-shared.page.scss'
})
export class DonationSharedPage {}
