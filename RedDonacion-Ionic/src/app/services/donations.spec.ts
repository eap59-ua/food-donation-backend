import { TestBed } from '@angular/core/testing';

import { Donations } from './donations';

describe('Donations', () => {
  let service: Donations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Donations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
