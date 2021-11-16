import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';
import { forkJoin, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

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

/**
 * Provides general capabilities to interact with different caching strategies.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private caches: Partial<CacheStrategyTypesDeclaration> =
    this.cachesTypes?.reduce(
      (caches, cache) => ({ ...caches, ...cache }),
      {},
    ) ?? {};

  constructor(
    private cacheStorageFactoryService: CacheStorageFactoryService,
    private injector: Injector,
    @Optional()
    @Inject(CacheStrategyTypesToken)
    private cachesTypes?: InjectionTokenType<typeof CacheStrategyTypesToken>,
  ) {}

  getCached<T>(
    id: CacheId,
    config: CacheStrategyConfig,
    operation: CacheOperation<T>,
  ): Observable<T> {
    if (!this.isCacheStrategyRegisteredType(config.type)) {
      throw Error(`CacheService: Unknown cache type ${config.type}`);
    }

    const cacheStrategy: CacheStrategy = this.injector.get(
      this.caches[config.type],
    );

    return cacheStrategy.getCached(id, config, operation);
  }

  clearCache(namespace?: string): Observable<void> {
    const cacheStorages = this.cacheStorageFactoryService.createAll();

    return forkJoin(
      cacheStorages.map((cacheStorage) => cacheStorage.clear(namespace)),
    ).pipe(mapTo(void 0));
  }

  private isCacheStrategyRegisteredType(
    type: CacheStrategyType,
  ): type is keyof CacheStrategyRegistry {
    return type in this.caches;
  }
}
