import { PersistenceStrategy } from './types';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStoragePersistenceStrategy } from './local-storage-persistence-strategy';

@Injectable({
  providedIn: 'root',
  useExisting: LocalStoragePersistenceStrategy,
})
export abstract class PersistenceService implements PersistenceStrategy {
  abstract save(key: string, value: unknown): Observable<void>;

  abstract retrieve(key: string): Observable<unknown>;
}
