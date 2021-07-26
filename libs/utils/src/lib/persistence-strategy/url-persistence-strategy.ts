import { Observable, fromEvent, of, EMPTY } from 'rxjs';
import {
  switchMap,
  shareReplay,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { PersistenceStrategy } from './types';

@Injectable({ providedIn: 'root' })
export class UrlPersistenceStrategy implements PersistenceStrategy {
  private urlSearch$ = fromEvent(window, 'popstate').pipe(
    map((event) => location.search),
    startWith(location.search),
  );

  save(key: string, value: unknown): Observable<void> {
    const convertedValue = JSON.stringify(value);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, convertedValue);

    const urlPathName = window.location.pathname;
    const urlHash = window.location.hash && `#${window.location.hash}`;
    const queryString = `${urlPathName}?${urlParams.toString() + urlHash}`;

    history.pushState({}, key, queryString);

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
}
