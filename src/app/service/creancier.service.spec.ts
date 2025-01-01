import { TestBed } from '@angular/core/testing';

import { CreancierService } from './creancier.service';

describe('CreancierService', () => {
  let service: CreancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
