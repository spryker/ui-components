import { TestBed } from '@angular/core/testing';

import { ChainDataTransformerService } from './chain-data-transformer.service';

describe('ChainDataTransformerService', () => {
  let service: ChainDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainDataTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
