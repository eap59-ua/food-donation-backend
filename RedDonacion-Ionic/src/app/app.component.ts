import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserResponseDTO } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  currentUser: UserResponseDTO | null = null;
  isAuthenticated = false;

  public appPages: { title: string; url: string; icon: string }[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (this.isAuthenticated) {
        this.buildMenu(true);
      }
    });
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated = auth;
      this.buildMenu(auth);
    });
  }

  buildMenu(auth: boolean) {
    if (!auth) {
      this.appPages = [];
      return;
    }
    this.appPages = [
      { title: 'Dashboard', url: '/dashboard', icon: 'home' },
      { title: 'Donaciones', url: '/donations-list', icon: 'restaurant' },
      { title: 'Mis Solicitudes', url: '/my-requests', icon: 'hand-right' },
    ];

    const role = this.currentUser?.role ?? this.authService.currentUser?.role;
    if (role === 'DONANTE') {
      this.appPages.push({ title: 'Nueva Donación', url: '/create-donation', icon: 'add-circle' });
    }
    if (role === 'ADMIN') {
      this.appPages.push({ title: 'Admin', url: '/admin', icon: 'settings' });
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
