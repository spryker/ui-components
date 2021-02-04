import { Injectable } from '@angular/core';
import { PersistenceStrategyService } from '@spryker/persistence';

import { CacheStorage, CacheStrategyConfig } from './types';
import { CacheStoragePersistanceAdapter } from './сache-storage-persistance-adapter';

@Injectable()
export class CacheStorageFactoryService {
  constructor(private persistenceStrategyService: PersistenceStrategyService) {}

  create(config: CacheStrategyConfig): CacheStorage {
    const persistenceStrategy = this.persistenceStrategyService.select(
      config.type,
    );

    return new CacheStoragePersistanceAdapter(persistenceStrategy);
  }

  createAll(): CacheStorage[] {
    const persistenceStrategies = this.persistenceStrategyService.getAll();

    return persistenceStrategies.map(
      (strategy) => new CacheStoragePersistanceAdapter(strategy),
    );
  }
}
