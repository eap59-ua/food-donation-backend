import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationNewPage } from './donation-new.page';

describe('DonationNewPage', () => {
  let component: DonationNewPage;
  let fixture: ComponentFixture<DonationNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
