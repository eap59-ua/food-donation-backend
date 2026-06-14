import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: false,
})
export class LandingPage {
  stats = [
    { icon: 'leaf-outline', value: '+1.200', label: 'Kilos salvados este mes', color: 'secondary' },
    { icon: 'heart-outline', value: '15', label: 'ONGs Registradas', color: 'primary' },
    { icon: 'people-outline', value: '340', label: 'Familias Ayudadas', color: 'dark' },
  ];

  steps = [
    {
      icon: 'cube-outline',
      number: '1',
      title: 'Publica el excedente',
      desc: 'Los restaurantes y supermercados registran sus alimentos disponibles, indicando cantidad y caducidad de forma sencilla.',
      bg: 'primary',
    },
    {
      icon: 'git-merge-outline',
      number: '2',
      title: 'Smart Match',
      desc: 'El sistema notifica instantáneamente a las organizaciones certificadas cercanas que necesitan exactamente ese tipo de donación.',
      bg: 'secondary',
    },
    {
      icon: 'heart-outline',
      number: '3',
      title: 'Recolección',
      desc: 'La organización acude a recogerla de forma local. Todo queda trazado para generar reportes de impacto.',
      bg: 'tertiary',
    },
  ];

  year = new Date().getFullYear();

  constructor(private router: Router) {}

  goToLogin()    { this.router.navigate(['/login']);    }
  goToRegister() { this.router.navigate(['/register']); }
}
