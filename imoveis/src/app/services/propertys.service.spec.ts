import { TestBed } from '@angular/core/testing';

import { PropertysService } from './propertys.service';

describe('PropertysService', () => {
  let service: PropertysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
