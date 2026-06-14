import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestNewPage } from './request-new.page';

describe('RequestNewPage', () => {
  let component: RequestNewPage;
  let fixture: ComponentFixture<RequestNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
