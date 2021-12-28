import { Injectable, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  PersistenceStrategyService,
  PersistenceStrategy,
} from '@spryker/persistence';
import { EMPTY, of } from 'rxjs';

import { CacheStorageFactoryService } from './cache-storage-factory.service';
import { CacheStoragePersistanceAdapter } from './сache-storage-persistance-adapter';

class MockPersistenceStrategyTypeService implements PersistenceStrategy {
  save = jest.fn().mockReturnValue(EMPTY);
  retrieve = jest.fn().mockReturnValue(of('mockValue'));
  remove = jest.fn().mockReturnValue(EMPTY);
}

@Injectable()
class MockPersistenceStrategyService {
  constructor(private injector: Injector) {}

  select = jest
    .fn()
    .mockReturnValue(this.injector.get(MockPersistenceStrategyTypeService));

  getAll = jest
    .fn()
    .mockReturnValue([this.injector.get(MockPersistenceStrategyTypeService)]);
}

describe('CacheStorageFactoryService', () => {
  let service: CacheStorageFactoryService;
  let mockPersistenceStrategyService: MockPersistenceStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockPersistenceStrategyService,
        MockPersistenceStrategyTypeService,
        {
          provide: PersistenceStrategyService,
          useExisting: MockPersistenceStrategyService,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(CacheStorageFactoryService);
    mockPersistenceStrategyService = TestBed.inject(
      MockPersistenceStrategyService,
    );
  });

  it('method `create` should return instance of `CacheStoragePersistanceAdapter` that uses a `PersistenceStrategy`', () => {
    const mockConfig = { storage: 'test', type: 'test' };
    const returnedClass = service.create(mockConfig);
    const expectedClass = new CacheStoragePersistanceAdapter(
      new MockPersistenceStrategyTypeService(),
    );

    expect(mockPersistenceStrategyService.select).toHaveBeenCalledWith(
      mockConfig.storage,
    );
    expect(
      returnedClass instanceof CacheStoragePersistanceAdapter,
    ).toBeTruthy();
    expect(JSON.stringify(returnedClass)).toBe(JSON.stringify(expectedClass));
  });

  it('method `create` should sore return `CacheStoragePersistanceAdapter` instance and reuse it for the same type', () => {
    const mockConfig = { type: 'test' };
    const returnedClass = service.create(mockConfig);
    const returnedClassWithSameType = service.create(mockConfig);

    expect(returnedClass).toBe(returnedClassWithSameType);
  });

  it('method `getAll` should return array of instances of `CacheStoragePersistanceAdapter` that uses a `PersistenceStrategy`', () => {
    const returnedClasses = service.createAll();
    const expectedClass = new CacheStoragePersistanceAdapter(
      new MockPersistenceStrategyTypeService(),
    );

    expect(mockPersistenceStrategyService.getAll).toHaveBeenCalled();
    expect(
      returnedClasses[0] instanceof CacheStoragePersistanceAdapter,
    ).toBeTruthy();
    expect(JSON.stringify(returnedClasses)).toBe(
      JSON.stringify([expectedClass]),
    );
  });
});
