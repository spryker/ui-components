import { Observable, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersistenceStrategy } from './types';

@Injectable({ providedIn: 'root' })
export class LocalStoragePersistenceStrategy implements PersistenceStrategy {
  save(key: string, value: unknown): Observable<void> {
    return EMPTY;
  }

  retrieve(key: string): Observable<unknown> {
    return EMPTY;
  }
}
