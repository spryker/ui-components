import { Type } from '@angular/core';
import { PersistenceStrategyType } from '@spryker/persistence';
import { Observable } from 'rxjs';

export interface CacheStrategyRegistry {}

export type CacheStrategyType = keyof CacheStrategyRegistry extends never ? string : keyof CacheStrategyRegistry;

export type CacheStrategyTypesDeclaration = {
    [P in keyof CacheStrategyRegistry]?: Type<CacheStrategy>;
};

export interface CacheStrategyConfig {
    type: CacheStrategyType;
    namespace?: string;
    storage?: PersistenceStrategyType;
    // Reserved for types that may have extra configuration
    [extraConfig: string]: unknown;
}

export type CacheOperation<T> = () => Observable<T>;

export interface CacheId {
    serialize(): string;
}

export interface CacheEntry<T = unknown> {
    value: T;
    updatedAt: Date;
}

export interface CacheStorage {
    has(id: CacheId, namespace?: string): Observable<boolean>;
    get<T>(id: CacheId, namespace?: string): Observable<CacheEntry<T> | undefined>;
    set(id: CacheId, data: CacheEntry, namespace?: string): Observable<void>;
    remove(id: CacheId, namespace?: string): Observable<void>;
    clear(namespace?: string): Observable<void>;
}

export interface CacheStrategy {
    getCached<T>(id: CacheId, config: CacheStrategyConfig, operation: CacheOperation<T>): Observable<T>;
}
