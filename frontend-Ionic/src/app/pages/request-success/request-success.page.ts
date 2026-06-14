import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-request-success',
  standalone: true,
  imports: [IonContent, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './request-success.page.html',
  styleUrl: './request-success.page.scss'
})
export class RequestSuccessPage {}
