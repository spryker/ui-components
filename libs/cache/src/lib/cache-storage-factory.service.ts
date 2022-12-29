import { Injectable } from '@angular/core';
import { InMemoryPersistenceStrategy, PersistenceStrategyService } from '@spryker/persistence';

import { CacheStorage, CacheStrategyConfig } from './types';
import { CacheStoragePersistenceAdapter } from './сache-storage-persistence-adapter';

/**
 * Encapsulates the creation of the CacheStorage instance types for a specific configurations.
 * Produces {@link CacheStorage} instance by using {@link PersistenceStrategyService} with the help of {@link CacheStoragePersistenceAdapter}.
 */
@Injectable({
    providedIn: 'root',
})
export class CacheStorageFactoryService {
    private persistenceStrategies: Record<string, CacheStorage> = {};
    constructor(
        private persistenceStrategyService: PersistenceStrategyService,
        private inMemoryPersistenceStrategy: InMemoryPersistenceStrategy,
    ) {}

    create(config: CacheStrategyConfig): CacheStorage {
        const persistenceStrategy = config.storage
            ? this.persistenceStrategyService.select(config.storage)
            : this.inMemoryPersistenceStrategy;

        if (!this.persistenceStrategies[config.type]) {
            const cacheStorageInstance = new CacheStoragePersistenceAdapter(persistenceStrategy);

            this.persistenceStrategies[config.type] = cacheStorageInstance;

            return cacheStorageInstance;
        }

        return this.persistenceStrategies[config.type];
    }

    createAll(): CacheStorage[] {
        const persistenceStrategies = this.persistenceStrategyService.getAll();

        return persistenceStrategies.map((strategy) => new CacheStoragePersistenceAdapter(strategy));
    }
}
