import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface PersistenceStrategyRegistry {
  // type: PersistenceStrategy;
}

export type PersistenceStrategyType = keyof PersistenceStrategyRegistry extends never
  ? string
  : keyof PersistenceStrategyRegistry;

export type PersistenceStrategyTypesDeclaration = {
  [P in keyof PersistenceStrategyRegistry]?: Type<PersistenceStrategy>;
};

export interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve<T>(key: string): Observable<T>;
  remove(key: string): Observable<void>;
}
