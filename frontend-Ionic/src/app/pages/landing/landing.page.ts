import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TopbarComponent],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss'
})
export class LandingPage {}
