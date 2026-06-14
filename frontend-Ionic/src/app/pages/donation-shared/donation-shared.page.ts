import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-donation-shared',
  standalone: true,
  imports: [IonContent, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './donation-shared.page.html',
  styleUrl: './donation-shared.page.scss'
})
export class DonationSharedPage {}
