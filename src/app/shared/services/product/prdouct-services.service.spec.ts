import { TestBed } from '@angular/core/testing';

import { PrdouctServices } from './prdouct-services.service';

describe('PrdouctServicesService', () => {
  let service: PrdouctServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrdouctServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
