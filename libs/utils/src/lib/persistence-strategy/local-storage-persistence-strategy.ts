import { Observable, EMPTY, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersistenceStrategy } from './types';
import { shareReplay, share, distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LocalStoragePersistenceStrategy implements PersistenceStrategy {
  items: Record<string, BehaviorSubject<any> | undefined> = {};
  refCounts: Record<string, number> = {};

  save(key: string, value: unknown): Observable<void> {
    const convertedValue = JSON.stringify(value);
    localStorage.setItem(key, convertedValue);

    // console.log(this.items[key]);

    this.items[key]?.next(value);

    return EMPTY;
  }

  retrieve<T>(key: string): Observable<T> {
    return new Observable<T>(subscriber => {
      const value = JSON.parse(localStorage.getItem(key) || 'null');

      if (!this.items[key]) {
        this.items[key] = new BehaviorSubject(value);
      }

      this.refCounts[key] = this.refCounts?.[key] ? this.refCounts[key]++ : 1;
      const subscription = this.items[key]?.subscribe(subscriber);

      return () => {
        this.refCounts[key] = this.refCounts?.[key] ? this.refCounts[key]-- : 0;

        if (!this.refCounts?.[key]) {
          this.items[key]?.complete();
          delete this.items[key];
        }

        subscription?.unsubscribe();
      };
    });
  }
}
