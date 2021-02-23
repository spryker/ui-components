import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { DataSerializerService } from '@spryker/data-serializer';
import { CacheService } from '@spryker/cache';

import { DatasourceHttpService } from './datasource-http.service';

class MockDataSerializerService {
  serialize = jest.fn();
}

class MockCacheService {
  getCached = jest.fn();
}

describe('DatasourceHttpService', () => {
  let service: DatasourceHttpService;
  let cacheService: MockCacheService;
  let dataSerializerService: MockDataSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DefaultContextSerializationModule],
      providers: [
        MockDataSerializerService,
        MockCacheService,
        {
          provide: DataSerializerService,
          useExisting: MockDataSerializerService,
        },
        {
          provide: CacheService,
          useExisting: MockCacheService,
        },
      ],
    });
    service = TestBed.inject(DatasourceHttpService);
    cacheService = TestBed.inject(MockCacheService);
    dataSerializerService = TestBed.inject(MockDataSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
