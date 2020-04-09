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
    history.pushState(
      { convertedValue },
      key,
      `${window.location.pathname}?${key}=${convertedValue}`,
    );

    return EMPTY;
  }

  retrieve(key: string): Observable<unknown> {
    return this.url$.pipe(
      distinctUntilChanged(),
      switchMap(url => {
        const urlParams = new URLSearchParams(url);
        const value = urlParams.get(key);

        return value ? of(JSON.parse(value)) : EMPTY;
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
