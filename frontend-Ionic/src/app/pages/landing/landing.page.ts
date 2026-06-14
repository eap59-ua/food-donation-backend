import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, RouterModule, TopbarComponent],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss'
})
export class LandingPage {}
