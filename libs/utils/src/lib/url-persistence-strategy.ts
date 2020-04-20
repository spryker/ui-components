import { Observable, fromEvent, of, EMPTY } from 'rxjs';
import {
  switchMap,
  shareReplay,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface PersistenceStrategy {
  save(key: string, value: unknown): Observable<void>;
  retrieve(key: string): Observable<unknown>;
}

@Injectable({ providedIn: 'root' })
export class UrlPersistenceStrategy implements PersistenceStrategy {
  url$ = fromEvent(window, 'popstate').pipe(
    map(event => location.href),
    startWith(location.href),
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

  retrieve(key: string): Observable<unknown> {
    return this.url$.pipe(
      distinctUntilChanged(),
      switchMap(url => {
        const urlParams = new URLSearchParams(url);
        const value = urlParams.get(key);

        return value ? of(JSON.parse(value)) : of(undefined);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
