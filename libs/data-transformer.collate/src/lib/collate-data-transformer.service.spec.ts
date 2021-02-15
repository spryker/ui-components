import { TestBed } from '@angular/core/testing';

import { ChainDataCollateService } from './collate-data-transformer.service';

describe('ChainDataCollateService', () => {
  let service: ChainDataCollateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainDataCollateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
