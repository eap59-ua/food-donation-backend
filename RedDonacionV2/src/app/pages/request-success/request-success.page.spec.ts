import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestSuccessPage } from './request-success.page';

describe('RequestSuccessPage', () => {
  let component: RequestSuccessPage;
  let fixture: ComponentFixture<RequestSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
