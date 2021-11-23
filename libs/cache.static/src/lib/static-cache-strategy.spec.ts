import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CacheId, CacheStorageFactoryService } from '@spryker/cache';
import { TimeDurationService } from '@spryker/utils/date';
import { of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StaticCacheStrategy } from './static-cache-strategy';

class MockCacheStoragePersistanceAdapter {
  items = new Map();

  has = jest.fn().mockImplementation((id: CacheId) => {
    return of(this.items.has(id.serialize()));
  });

  get = jest.fn().mockImplementation((id: CacheId) => {
    return of(this.items.get(id.serialize()));
  });

  set = jest.fn().mockImplementation((id: CacheId, data: unknown) => {
    this.items.set(id.serialize(), data);

    return of(void 0);
  });

  remove = jest.fn().mockImplementation((id: CacheId) => {
    this.items.delete(id.serialize());

    return of(void 0);
  });
}

class MockCacheStorageFactoryService {
  create = jest.fn();
}

class MockTimeDuration {
  addTo = jest.fn();
}

class MockTimeDurationService {
  parse = jest.fn();
}

const mockConfig: any = {
  type: 'test',
  expiresIn: '2d',
};

const mockId = {
  serialize: () => 'id',
};

describe('StaticCacheStrategy', () => {
  let service: StaticCacheStrategy;
  let cacheStoragePersistanceAdapter: MockCacheStoragePersistanceAdapter;
  let timeDurationService: MockTimeDurationService;
  let cacheStorageFactoryService: MockCacheStorageFactoryService;
  let timeDuration: MockTimeDuration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockCacheStorageFactoryService,
        MockTimeDurationService,
        {
          provide: CacheStorageFactoryService,
          useExisting: MockCacheStorageFactoryService,
        },
        {
          provide: TimeDurationService,
          useExisting: MockTimeDurationService,
        },
      ],
    });
    service = TestBed.inject(StaticCacheStrategy);
    timeDurationService = TestBed.inject(MockTimeDurationService);
    cacheStorageFactoryService = TestBed.inject(MockCacheStorageFactoryService);
    cacheStoragePersistanceAdapter = new MockCacheStoragePersistanceAdapter();
    timeDuration = new MockTimeDuration();

    cacheStorageFactoryService.create.mockReturnValue(
      cacheStoragePersistanceAdapter,
    );
    timeDurationService.parse.mockReturnValue(timeDuration);
  });

  it('getCached method should store entry with value and updatedAt current date by id to the storage and return observable with value', () => {
    const mockOperations = jest.fn();
    const callback = jest.fn();
    const mockValue = 'mockValue';
    const getCachedObservable$ = service.getCached(
      mockId,
      mockConfig,
      mockOperations.mockReturnValue(of(mockValue)),
    );

    getCachedObservable$.subscribe(callback);

    const entry = cacheStoragePersistanceAdapter.items.get(mockId.serialize());

    expect(callback).toHaveBeenCalledWith(mockValue);
    expect(entry.value).toBe(mockValue);
    expect(entry.updatedAt).toBeInstanceOf(Date);
  });

  it('getCached method should cache entry exist in the storage and the date is not expired and return in from cache', () => {
    const mockOperations = jest.fn();
    const callback = jest.fn();
    const mockValue = 'mockValue';
    const today = new Date();
    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);
    timeDuration.addTo.mockReturnValue(tomorrow);

    const triggerGetCached$ = new ReplaySubject<string>(1);
    const getCachedObservable$ = triggerGetCached$.pipe(
      switchMap((value) =>
        service.getCached(
          mockId,
          mockConfig,
          mockOperations.mockReturnValue(of(value)),
        ),
      ),
    );

    triggerGetCached$.next(mockValue);
    getCachedObservable$.subscribe(callback);

    const entry = cacheStoragePersistanceAdapter.items.get(mockId.serialize());

    triggerGetCached$.next(mockValue);

    const cachedEntry = cacheStoragePersistanceAdapter.items.get(
      mockId.serialize(),
    );

    expect(entry).toEqual(cachedEntry);
    expect(callback).toHaveBeenCalledWith(mockValue);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(mockOperations).toHaveBeenCalledTimes(1);
  });

  it('getCached method should return new entry with new value and date if date has been expired', fakeAsync(() => {
    const mockOperations = jest.fn();
    const callback = jest.fn();
    const mockValue = 'mockValue';
    const date = new Date();

    timeDuration.addTo.mockReturnValue(date);

    const newMockValue = 'newMockValue';
    const triggerGetCached$ = new ReplaySubject<string>(1);
    const getCachedObservable$ = triggerGetCached$.pipe(
      switchMap((value) =>
        service.getCached(
          mockId,
          mockConfig,
          mockOperations.mockReturnValue(of(value)),
        ),
      ),
    );

    triggerGetCached$.next(mockValue);
    getCachedObservable$.subscribe(callback);

    const entry = cacheStoragePersistanceAdapter.items.get(mockId.serialize());

    tick(500);
    triggerGetCached$.next(newMockValue);

    const cachedEntry = cacheStoragePersistanceAdapter.items.get(
      mockId.serialize(),
    );

    expect(cachedEntry.value).toBe(newMockValue);
    expect(cachedEntry.updatedAt).toBeInstanceOf(Date);
    expect(callback).toHaveBeenCalledWith(mockValue);
    expect(callback).toHaveBeenCalledWith(newMockValue);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(entry).not.toEqual(cachedEntry);
    expect(mockOperations).toHaveBeenCalledTimes(2);
  }));
});
