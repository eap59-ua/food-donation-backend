import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Donation } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  donations: Donation[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.listDonations().subscribe(donations => this.donations = donations);
  }
}
