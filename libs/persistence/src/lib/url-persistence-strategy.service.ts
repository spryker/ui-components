import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, Observable, of } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { PersistenceStrategy } from './types';

@Injectable({
  providedIn: 'root',
})
export class UrlPersistenceStrategyService implements PersistenceStrategy {
  private urlSearch$ = fromEvent(window, 'popstate').pipe(
    map((event) => location.search),
    startWith(location.search),
  );

  save(key: string, value: unknown): Observable<void> {
    const convertedValue = JSON.stringify(value);
    const urlParams = new URLSearchParams(window.location.search);
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
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(key);

    this.pushUrlState(key, urlParams);

    return EMPTY;
  }

  private pushUrlState(key: string, urlParams: URLSearchParams): void {
    const urlPathName = window.location.pathname;
    const urlHash = window.location.hash && `#${window.location.hash}`;
    const queryString = `${urlPathName}?${urlParams.toString() + urlHash}`;

    history.pushState({}, key, queryString);
  }
}
