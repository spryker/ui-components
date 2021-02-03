import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';

import { PersistenceStrategy } from './types';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragePersistenceStrategyService
  implements PersistenceStrategy {
  private items: Record<string, BehaviorSubject<any> | undefined> = {};

  save(key: string, value: unknown): Observable<void> {
    const value$ = this.initValue(key, value);
    const convertedValue = JSON.stringify(value);
    localStorage.setItem(key, convertedValue);
    value$.next(value);

    return EMPTY;
  }

  retrieve<T>(key: string): Observable<T> {
    const value = JSON.parse(localStorage.getItem(key) || 'null');

    return this.initValue(key, value).asObservable();
  }

  remove(key: string): Observable<void> {
    if (!this.items[key]) {
      return EMPTY;
    }

    localStorage.removeItem(key);
    this.items[key]?.next(undefined);
    this.items[key]?.complete();
    delete this.items[key];

    return EMPTY;
  }

  private initValue<T>(key: string, value: T): BehaviorSubject<T> {
    if (!this.items[key]) {
      this.items[key] = new BehaviorSubject(value);
    }

    // tslint:disable-next-line: no-non-null-assertion
    return this.items[key]!;
  }
}
