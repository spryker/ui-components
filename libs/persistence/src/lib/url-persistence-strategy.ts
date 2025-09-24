import { Inject, Injectable } from '@angular/core';
import { InjectionTokenType, WindowToken } from '@spryker/utils';
import { EMPTY, fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PersistenceStrategy } from './types';

/**
 * Manages data via window url.
 */
@Injectable({
    providedIn: 'root',
})
export class UrlPersistenceStrategy implements PersistenceStrategy {
    private urlSearch$ = fromEvent(this.windowToken, 'popstate').pipe(
        map(() => this.windowToken.location.search),
        startWith(this.windowToken.location.search),
    );

    constructor(
        @Inject(WindowToken)
        private windowToken: InjectionTokenType<typeof WindowToken>,
    ) {}

    save(key: string, value: unknown): Observable<void> {
        const convertedValue = JSON.stringify(value);
        const urlParams = new URLSearchParams(this.windowToken.location.search);
        urlParams.set(key, convertedValue);

        this.pushUrlState(key, urlParams);

        return EMPTY;
    }

    retrieve<T>(key: string): Observable<T> {
        return this.urlSearch$.pipe(
            distinctUntilChanged(),
            switchMap((urlSearch) => {
                const urlParams = new URLSearchParams(urlSearch);
                const value = urlParams.get(key);

                return value ? of(JSON.parse(value)) : of(undefined);
            }),
            shareReplay({ bufferSize: 1, refCount: true }),
        );
    }

    remove(key: string): Observable<void> {
        const urlParams = new URLSearchParams(this.windowToken.location.search);
        urlParams.delete(key);

        this.pushUrlState(key, urlParams);

        return EMPTY;
    }

    private pushUrlState(key: string, urlParams: URLSearchParams): void {
        const urlPathName = this.windowToken.location.pathname;
        const urlHash = this.windowToken.location.hash && `#${this.windowToken.location.hash}`;
        const queryString = `${urlPathName}?${urlParams.toString() + urlHash}`;

        this.windowToken.history.pushState({}, key, queryString);
    }
}
