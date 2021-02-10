import { Injectable } from '@angular/core';
import { PersistenceStrategyService } from '@spryker/persistence';

import { CacheStorage, CacheStrategyConfig } from './types';
import { CacheStoragePersistanceAdapter } from './сache-storage-persistance-adapter';

/**
 * Encapsulates the creation of the CacheStorage instance types for a specific configurations.
 * Produces {@link CacheStorage} instance by using {@link PersistenceStrategyService} with the help of {@link CacheStoragePersistanceAdapter}.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheStorageFactoryService {
  private persistenceStrategies: Record<string, CacheStorage> = {};
  constructor(private persistenceStrategyService: PersistenceStrategyService) {}

  create(config: CacheStrategyConfig): CacheStorage {
    const persistenceStrategy = this.persistenceStrategyService.select(
      config.type,
    );

    if (!this.persistenceStrategies[config.type]) {
      const cacheStorageInstance = new CacheStoragePersistanceAdapter(
        persistenceStrategy,
      );

      this.persistenceStrategies[config.type] = cacheStorageInstance;

      return cacheStorageInstance;
    }

    return this.persistenceStrategies[config.type];
  }

  createAll(): CacheStorage[] {
    const persistenceStrategies = this.persistenceStrategyService.getAll();

    return persistenceStrategies.map(
      (strategy) => new CacheStoragePersistanceAdapter(strategy),
    );
  }
}
