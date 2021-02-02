import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStoragePersistenceStrategyService } from './local-storage-persistence-strategy.service';
import { PersistenceStrategy } from './types';

@Injectable({
  providedIn: 'root',
  useExisting: LocalStoragePersistenceStrategyService,
})
export abstract class PersistenceService implements PersistenceStrategy {
  abstract save(key: string, value: unknown): Observable<void>;

  abstract retrieve<T>(key: string): Observable<T>;
  abstract remove(key: string): Observable<void>;
}
