import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IonButton, IonIcon],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Input() publicMode = false;
  @Input() active: 'dashboard' | 'donations' | 'requests' | 'profile' | '' = '';

  menuOpen = false;

  constructor(public readonly auth: AuthService, private readonly router: Router) {}

  logout(): void {
    this.auth.logout(false);
    this.router.navigate(['/login']);
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
