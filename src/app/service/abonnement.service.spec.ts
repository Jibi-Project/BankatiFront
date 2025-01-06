import { TestBed } from '@angular/core/testing';

import { AbonnementsService} from './abonnement.service';

describe('AbonnementService', () => {
  let service: AbonnementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonnementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
