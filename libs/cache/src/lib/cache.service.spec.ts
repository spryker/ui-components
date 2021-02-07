import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';

import { CacheStorageFactoryService } from './cache-storage-factory.service';
import { CacheModule } from './cache.module';
import { CacheService } from './cache.service';

const mockStrategyType = 'mockStrategyType';

class MockCacheStoragePersistanceAdapter {
  clear = jest.fn();
}

class MockCacheStorageFactoryService {
  createAll = jest
    .fn()
    .mockReturnValue([
      new MockCacheStoragePersistanceAdapter(),
      new MockCacheStoragePersistanceAdapter(),
    ]);
}

class MockCacheStrategy {
  getCached = jest.fn();
}

describe('CacheService', () => {
  let service: CacheService;
  let cacheStrategy: MockCacheStrategy;
  let cacheFactory: MockCacheStorageFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CacheModule.withStrategies({
          [mockStrategyType]: MockCacheStrategy,
        }),
      ],
      providers: [
        MockCacheStrategy,
        MockCacheStorageFactoryService,
        {
          provide: CacheStorageFactoryService,
          useExisting: MockCacheStorageFactoryService,
        },
      ],
    });
    service = TestBed.inject(CacheService);
    cacheStrategy = TestBed.inject(MockCacheStrategy);
    cacheFactory = TestBed.inject(MockCacheStorageFactoryService);
  });

  it('getCached method returns the result from call CacheStrategy.getCached() with arguments `id` and `config` and `operation`', () => {
    const mockId = {
      serialize: () => 'id',
    };
    const mockConfig = {
      type: mockStrategyType,
    };
    const mockOperation = () => EMPTY;
    service.getCached(mockId, mockConfig, mockOperation);

    expect(cacheStrategy.getCached).toHaveBeenCalledWith(
      mockId,
      mockConfig,
      mockOperation,
    );
  });

  it('getCached method find the CacheStrategy based on the config.type from CacheStrategyTypesToken, if no CacheStrategy found - throw an error', () => {
    const mockId = {
      serialize: () => 'id',
    };
    const mockConfig = {
      type: 'invalidType',
    };
    const mockOperation = () => EMPTY;

    expect(() => {
      service.getCached(mockId, mockConfig, mockOperation);
    }).toThrow();
  });

  it('clearCache method for every CacheStorage call CacheStorage.clear() with argument namespace', () => {
    const mockNamespace = 'namespace';
    const clearObserver$ = service.clearCache(mockNamespace);
    clearObserver$.subscribe();

    const cacheStorages: MockCacheStoragePersistanceAdapter[] = cacheFactory.createAll();

    cacheStorages.forEach((cacheStorage) => {
      expect(cacheStorage.clear).toHaveBeenCalledWith(mockNamespace);
    });
  });
});
