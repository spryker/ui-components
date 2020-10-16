import { Injectable } from '@angular/core';
import { EMPTY, fromEvent, Observable } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';
import { PersistenceStrategy } from './types';

@Injectable({ providedIn: 'root' })
export class UrlPersistenceStrategy implements PersistenceStrategy {
  private urlSearch$ = fromEvent(window, 'popstate').pipe(
    map(event => location.search),
    // Trigger CD in next tick
    tap(() => setTimeout(() => null)),
    startWith(location.search),
  );

  save(key: string, value: unknown): Observable<void> {
    const convertedValue = JSON.stringify(value);
    const urlParams = new URLSearchParams(window.location.search);

    if (convertedValue) {
      urlParams.set(key, convertedValue);
    } else {
      urlParams.delete(key);
    }

    const urlPathName = window.location.pathname;
    const urlHash = window.location.hash && `#${window.location.hash}`;
    const queryString = `${urlPathName}?${urlParams.toString() + urlHash}`;

    history.pushState({}, key, queryString);

    return EMPTY;
  }

  retrieve<T>(key: string): Observable<T | undefined> {
    return this.urlSearch$.pipe(
      map(urlSearch => {
        const urlParams = new URLSearchParams(urlSearch);
        const value = urlParams.get(key);

        return value ? (JSON.parse(value) as T) : undefined;
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}
