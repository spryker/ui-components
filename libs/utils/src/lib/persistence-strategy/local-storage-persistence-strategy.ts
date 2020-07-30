import { Observable, EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersistenceStrategy } from './types';

@Injectable({ providedIn: 'root' })
export class LocalStoragePersistenceStrategy implements PersistenceStrategy {
  save(key: string, value: unknown): Observable<void> {
    const convertedValue = JSON.stringify(value);
    localStorage.setItem(key, convertedValue);

    return EMPTY;
  }

  retrieve(key: string): Observable<unknown> {
    return of(JSON.parse(localStorage.getItem(key) || 'null'));
  }
}
