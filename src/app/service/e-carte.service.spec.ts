import { TestBed } from '@angular/core/testing';

import { ECarteService } from './e-carte.service';

describe('ECarteService', () => {
  let service: ECarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
