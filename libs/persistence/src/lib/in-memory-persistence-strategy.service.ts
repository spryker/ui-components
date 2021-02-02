import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryPersistenceStrategyService {
  private items: Record<string, BehaviorSubject<any> | undefined> = {};
  private refCounts: Record<string, number> = {};

  save(key: string, value: unknown): Observable<void> {
    if (!this.items[key]) {
      this.items[key] = new BehaviorSubject(value);

      return EMPTY;
    }

    this.items[key]?.next(value);

    return EMPTY;
  }

  retrieve<T>(key: string): Observable<T> {
    return new Observable<T>((subscriber) => {
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

  remove(key: string): Observable<void> {
    if (!this.items[key]) {
      return EMPTY;
    }

    this.items[key]?.next(undefined);
    this.items[key]?.complete();
    delete this.items[key];

    return EMPTY;
  }
}
