import { TestBed } from '@angular/core/testing';

import { CategorysliderService } from './categoryslider.service';

describe('CategorysliderService', () => {
  let service: CategorysliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorysliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
