import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly menuCtrl: MenuController
  ) {
    this.auth.restoreSession();
  }

  closeMenu(): void {
    this.menuCtrl.close('principal');
  }

  logout(): void {
    this.menuCtrl.close('principal');
    this.auth.logout(true);
  }
}
