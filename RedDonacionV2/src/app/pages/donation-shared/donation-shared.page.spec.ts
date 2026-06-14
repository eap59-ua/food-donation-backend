import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationSharedPage } from './donation-shared.page';

describe('DonationSharedPage', () => {
  let component: DonationSharedPage;
  let fixture: ComponentFixture<DonationSharedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationSharedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
