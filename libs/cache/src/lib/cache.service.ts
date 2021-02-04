import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { forkJoin, Observable } from 'rxjs';

import { CacheStorageFactoryService } from './cache-storage-factory.service';
import { CacheStrategyTypesToken } from './token';
import {
  CacheId,
  CacheOperation,
  CacheStrategy,
  CacheStrategyConfig,
  CacheStrategyRegistry,
  CacheStrategyType,
  CacheStrategyTypesDeclaration,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private caches: CacheStrategyTypesDeclaration = this.cachesTypes?.reduce(
    (caches, cache) => ({ ...caches, ...cache }),
    {},
  );

  constructor(
    private cacheStorageFactoryService: CacheStorageFactoryService,
    private injector: Injector,
    @Inject(CacheStrategyTypesToken)
    private cachesTypes: InjectionTokenType<typeof CacheStrategyTypesToken>,
  ) {}

  getCached<T>(
    id: CacheId,
    config: CacheStrategyConfig,
    operation: CacheOperation<T>,
  ): Observable<T> {
    if (!this.isCacheStrategyRegisteredType(config.type)) {
      throw Error(`CacheService: Unknown cache type ${config.type}`);
    }

    const cacheInstance: CacheStrategy = this.injector.get(
      this.caches?.[config.type],
    );

    return cacheInstance.getCached(id, config, operation);
  }

  clearCache(namespace?: string): Observable<void> {
    const cacheStorages = this.cacheStorageFactoryService.createAll();

    return forkJoin(
      ...cacheStorages.map((cacheStorage) => cacheStorage.clear(namespace)),
    );
  }

  private isCacheStrategyRegisteredType(
    type: CacheStrategyType,
  ): type is keyof CacheStrategyRegistry {
    return type in this.caches;
  }
}
