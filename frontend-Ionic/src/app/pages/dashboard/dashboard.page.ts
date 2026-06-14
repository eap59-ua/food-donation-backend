import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ApiService } from '../../core/api.service';
import { Donation } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, TopbarComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage implements OnInit {
  donations: Donation[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.listDonations().subscribe(donations => this.donations = donations);
  }
}
