import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationDetailPage } from './donation-detail.page';

describe('DonationDetailPage', () => {
  let component: DonationDetailPage;
  let fixture: ComponentFixture<DonationDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
