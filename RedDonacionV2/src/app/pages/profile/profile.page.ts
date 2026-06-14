import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { formatDate, roleLabel } from '../../core/format';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  protected readonly formatDate = formatDate;
  protected readonly roleLabel = roleLabel;

  constructor(public readonly auth: AuthService) {}
}
