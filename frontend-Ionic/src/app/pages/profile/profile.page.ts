import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AuthService } from '../../core/auth.service';
import { formatDate, roleLabel } from '../../core/format';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss'
})
export class ProfilePage {
  protected readonly formatDate = formatDate;
  protected readonly roleLabel = roleLabel;

  constructor(public readonly auth: AuthService) {}
}
