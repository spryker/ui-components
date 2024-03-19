import { Inject, Injectable } from '@angular/core';
import { InjectionTokenType, WindowToken } from '@spryker/utils';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';

import { PersistenceStrategy } from './types';

/**
 * Manages data via localStorage.
 */
@Injectable({
    providedIn: 'root',
})
export class LocalStoragePersistenceStrategy implements PersistenceStrategy {
    private items: Record<string, BehaviorSubject<any> | undefined> = {};

    constructor(
        @Inject(WindowToken)
        private windowToken: InjectionTokenType<typeof WindowToken>,
    ) {}

    save(key: string, value: unknown): Observable<void> {
        const value$ = this.initValue(key, value);
        const convertedValue = JSON.stringify(value);

        this.windowToken.localStorage.setItem(key, convertedValue);
        value$.next(value);

        return EMPTY;
    }

    retrieve<T>(key: string): Observable<T | undefined> {
        const storageValue = this.windowToken.localStorage.getItem(key);
        const value = storageValue ? JSON.parse(storageValue) : undefined;

        return this.initValue(key, value).asObservable();
    }

    remove(key: string): Observable<void> {
        if (!this.items[key]) {
            return EMPTY;
        }

        this.windowToken.localStorage.removeItem(key);
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
