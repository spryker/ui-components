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

class MockPersistenceStrategyTypeService {
  save = jest.fn().mockReturnValue(EMPTY);
  retrieve = jest.fn().mockReturnValue(of(mockManifest));
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

  it('has method must check Manifest if the cache entry with namespace is stored in the PersistenceStrategies and return `true` if strategy exist', (done) => {
    const hasWithStrategyObserver$ = instance.has(mockId, mockNamespace);

    hasWithStrategyObserver$.subscribe((isStrategyExist) => {
      expect(isStrategyExist).toBeTruthy();
      done();
    });
  });

  it('has method must check Manifest if the cache entry with namespace is stored in the PersistenceStrategies and return `false` if strategy does not exist', (done) => {
    const hasWithoutStrategyObserver$ = instance.has(mockId, 'namespace');

    hasWithoutStrategyObserver$.subscribe((isStrategyExist) => {
      expect(isStrategyExist).toBeFalsy();
      done();
    });
  });

  it('get method must return cache entry with namespace from PersistenceStrategies using PersistenceStrategy.retrieve()', () => {
    const getObserver$ = instance.get(mockId, mockNamespace);
    getObserver$.subscribe();

    const name = `${mockNamespace}.${mockId.serialize()}`;

    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      CacheStoragePersistanceAdapter.ManifestId,
    );
    expect(mockPersistenceStrategyTypeService.retrieve).toHaveBeenCalledWith(
      name,
    );
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
