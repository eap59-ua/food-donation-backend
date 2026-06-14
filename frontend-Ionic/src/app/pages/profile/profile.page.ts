import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AuthService } from '../../core/auth.service';
import { formatDate, roleLabel } from '../../core/format';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TopbarComponent],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss'
})
export class ProfilePage {
  protected readonly formatDate = formatDate;
  protected readonly roleLabel = roleLabel;

  constructor(public readonly auth: AuthService) {}
}
