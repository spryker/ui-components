import { TestBed } from '@angular/core/testing';

import { TableLocatorService } from './table-locator.service';

describe('TableLocatorService', () => {
  let service: TableLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
