import { EMPTY, of } from 'rxjs';

import { CacheStoragePersistanceAdapter } from './сache-storage-persistance-adapter';

const mockNamespace = 'mockNamespace';
const mockId = {
  serialize: () => 'mockId',
};
const mockSecondId = {
  serialize: () => 'mockSecondId',
};
const mockThirdId = {
  serialize: () => 'mockThirdId',
};
const mockManifest = new Map([
  [
    mockNamespace,
    [
      {
        id: mockId.serialize(),
        name: `${mockNamespace}.${mockId.serialize()}`,
      },
      {
        id: mockSecondId.serialize(),
        name: `${mockNamespace}.${mockSecondId.serialize()}`,
      },
      {
        id: mockThirdId.serialize(),
        name: `${mockNamespace}.${mockThirdId.serialize()}`,
      },
    ],
  ],
]);

const mockStrategyData = new Map([
  [
    `${mockNamespace}.${mockId.serialize()}`,
    {
      data: 'mockData',
    },
  ],
]);

class MockPersistenceStrategyTypeService {
  save = jest.fn().mockReturnValue(EMPTY);
  retrieve = jest.fn().mockImplementation((name) => {
    if (name === CacheStoragePersistanceAdapter.ManifestId) {
      return of(mockManifest);
    } else {
      return of(mockStrategyData.get(name));
    }
  });
  remove = jest.fn().mockReturnValue(EMPTY);
}

describe('CacheStoragePersistanceAdapter', () => {
  let instance: CacheStoragePersistanceAdapter;
  let mockPersistenceStrategyTypeService: MockPersistenceStrategyTypeService;

  beforeEach(() => {
    mockPersistenceStrategyTypeService = new MockPersistenceStrategyTypeService();
    instance = new CacheStoragePersistanceAdapter(
      mockPersistenceStrategyTypeService,
    );
  });

  it('has method must check Manifest if the cache entry with namespace is stored in the PersistenceStrategies and return `true` if strategy exist', () => {
    const hasWithStrategyObserver$ = instance.has(mockId, mockNamespace);
    const callback = jest.fn();

    hasWithStrategyObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('has method must check Manifest if the cache entry with namespace is stored in the PersistenceStrategies and return `false` if strategy does not exist', () => {
    const hasWithoutStrategyObserver$ = instance.has(mockId, 'namespace');
    const callback = jest.fn();

    hasWithoutStrategyObserver$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(false);
  });

  it('get method must return cache entry with namespace from PersistenceStrategies using PersistenceStrategy.retrieve()', () => {
    const getObserver$ = instance.get(mockId, mockNamespace);
    const callback = jest.fn();

    getObserver$.subscribe(callback);

    const name = `${mockNamespace}.${mockId.serialize()}`;
    const getValue = mockStrategyData.get(name);

    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
    );
    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      name,
    );
    expect(callback).toHaveBeenCalledWith(getValue);
  });

  it('set method must save cache entry with namespace in PersistenceStrategies and add cache entry with namespace to the Manifest', () => {
    const cacheId = {
      serialize: () => 'mockId',
    };
    const cacheEntry = {
      value: 'mockValue',
      updatedAt: new Date(),
    };
    const setObserver$ = instance.set(cacheId, cacheEntry);
    setObserver$.subscribe();

    const name = `${
      CacheStoragePersistanceAdapter.DefaultNamespace
    }.${cacheId.serialize()}`;
    mockManifest.set(CacheStoragePersistanceAdapter.DefaultNamespace, [
      {
        id: cacheId.serialize(),
        name,
      },
    ]);

    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
    );
    expect(mockPersistenceStrategyTypeService.save).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
      mockManifest,
    );
    expect(mockPersistenceStrategyTypeService.save).toHaveBeenCalledWith(
      name,
      cacheEntry,
    );
  });

  it('remove method must remove cache entry with namespace in PersistenceStrategies using PersistenceStrategy.remove() and remove cache entry with namespace from the Manifest', () => {
    const removeObserver$ = instance.remove(mockId, mockNamespace);
    removeObserver$.subscribe();

    const name = `${mockNamespace}.${mockId.serialize()}`;
    const configs = mockManifest.get(mockNamespace);
    const serializedId = mockId.serialize();

    mockManifest.set(
      mockNamespace,
      // tslint:disable-next-line: no-non-null-assertion
      configs!.filter((config) => config.id !== serializedId),
    );

    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
    );
    expect(mockPersistenceStrategyTypeService.save).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
      mockManifest,
    );
    expect(mockPersistenceStrategyTypeService.remove).toHaveBeenCalledWith(
      name,
    );
  });

  it('clear method must remove every cache entry from the PersistenceStrategies by using PersistenceStrategy.remove()', () => {
    const clearObserver$ = instance.clear(mockNamespace);
    clearObserver$.subscribe();

    mockManifest.delete(mockNamespace);

    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
    );
    expect(mockPersistenceStrategyTypeService.save).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
      mockManifest,
    );
    expect(mockPersistenceStrategyTypeService.remove).toHaveBeenCalledWith(
      `${mockNamespace}.${mockThirdId.serialize()}`,
    );
    expect(mockPersistenceStrategyTypeService.remove).toHaveBeenCalledWith(
      `${mockNamespace}.${mockSecondId.serialize()}`,
    );
  });
});
