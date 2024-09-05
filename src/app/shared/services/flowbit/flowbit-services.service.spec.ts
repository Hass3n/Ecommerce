import { TestBed } from '@angular/core/testing';

import { FlowbitServicesService } from './flowbit-services.service';

describe('FlowbitServicesService', () => {
  let service: FlowbitServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
