import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStoragePersistenceStrategy } from './local-storage-persistence-strategy';
import { PersistenceStrategy } from './types';

/**
 * Abstract service that is simply a shortcut to a default Persistence Strategy.
 */
@Injectable({
  providedIn: 'root',
  useExisting: LocalStoragePersistenceStrategy,
})
export abstract class PersistenceService implements PersistenceStrategy {
  abstract save(key: string, value: unknown): Observable<void>;

  abstract retrieve<T>(key: string): Observable<T>;
  abstract remove(key: string): Observable<void>;
}
