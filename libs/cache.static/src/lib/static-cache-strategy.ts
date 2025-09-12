import { Injectable, inject } from '@angular/core';
import { CacheId, CacheOperation, CacheStrategy, CacheStorageFactoryService, CacheEntry } from '@spryker/cache';
import { of, Observable } from 'rxjs';
import { TimeDurationService } from '@spryker/utils/date';

import { StaticCacheStrategyConfig } from './types';
import { switchMap, mapTo } from 'rxjs/operators';

/**
 * Puts cache entries to the {@link CacheStorage} forever, unless the {@link CacheStorage} is cleared or CacheEntry is expired.
 */
@Injectable({
    providedIn: 'root',
})
export class StaticCacheStrategy implements CacheStrategy {
    private timeDurationService = inject(TimeDurationService);
    private cacheStorageFactoryService = inject(CacheStorageFactoryService);

    getCached<T>(id: CacheId, config: StaticCacheStrategyConfig, operation: CacheOperation<T>): Observable<T> {
        const cacheDuration = this.timeDurationService.parse(config.expiresIn);
        const cacheStorage = this.cacheStorageFactoryService.create(config);

        return cacheStorage.has(id, config.namespace).pipe(
            switchMap((isCacheEntryExist) => {
                if (isCacheEntryExist) {
                    return cacheStorage.get<T>(id, config.namespace).pipe(
                        switchMap((cacheEntry) => {
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            const { value, updatedAt } = cacheEntry!;
                            const expiryDate = cacheDuration.addTo(updatedAt);
                            const currentDate = new Date();

                            if (currentDate.getTime() > expiryDate.getTime()) {
                                return cacheStorage.remove(id, config.namespace).pipe(
                                    switchMap(() =>
                                        operation().pipe(
                                            switchMap((operationValue) => {
                                                const newEntry: CacheEntry = {
                                                    updatedAt: new Date(),
                                                    value: operationValue,
                                                };

                                                return cacheStorage
                                                    .set(id, newEntry, config.namespace)
                                                    .pipe(mapTo(operationValue));
                                            }),
                                        ),
                                    ),
                                );
                            }

                            return of(value);
                        }),
                    );
                }

                return operation().pipe(
                    switchMap((value) => {
                        const entry: CacheEntry = {
                            updatedAt: new Date(),
                            value,
                        };

                        return cacheStorage.set(id, entry, config.namespace).pipe(mapTo(value));
                    }),
                );
            }),
        );
    }
}
