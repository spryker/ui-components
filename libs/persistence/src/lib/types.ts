/* tslint:disable:no-empty-interface */
import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface PersistenceStrategyRegistry {}

export type PersistenceStrategyType =
  keyof PersistenceStrategyRegistry extends never
    ? string
    : keyof PersistenceStrategyRegistry;

export type PersistenceStrategyTypesDeclaration = {
  [P in keyof PersistenceStrategyRegistry]?: Type<PersistenceStrategy>;
};

export interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve<T>(key: string): Observable<T | undefined>;
  remove(key: string): Observable<void>;
}
