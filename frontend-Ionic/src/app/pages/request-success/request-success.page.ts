import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-request-success',
  standalone: true,
  imports: [IonicModule, RouterModule, TopbarComponent],
  templateUrl: './request-success.page.html',
  styleUrl: './request-success.page.scss'
})
export class RequestSuccessPage {}
