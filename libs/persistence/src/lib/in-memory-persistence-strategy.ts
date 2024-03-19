import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, EMPTY } from 'rxjs';
import { PersistenceStrategy } from './types';

/**
 * Manages data via runtime `in-memory` storage.
 */
@Injectable({
    providedIn: 'root',
})
export class InMemoryPersistenceStrategy implements PersistenceStrategy {
    private items: Record<string, BehaviorSubject<any> | undefined> = {};

    save(key: string, value: unknown): Observable<void> {
        const value$ = this.initValue(key, value);
        value$.next(value);

        return EMPTY;
    }

    retrieve<T>(key: string): Observable<T | undefined> {
        return this.initValue(key, undefined).asObservable();
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

    private initValue<T>(key: string, value: T): BehaviorSubject<T> {
        if (!this.items[key]) {
            this.items[key] = new BehaviorSubject(value);
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.items[key]!;
    }
}
