import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonationsListPage } from './donations-list.page';

describe('DonationsListPage', () => {
  let component: DonationsListPage;
  let fixture: ComponentFixture<DonationsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
