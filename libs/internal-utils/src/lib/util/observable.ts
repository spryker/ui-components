import { from, isObservable, Observable, of } from 'rxjs';

import { isPromise } from './promise';

export function ensureObservable<T>(
  val: T | PromiseLike<T> | Observable<T>,
): Observable<T> {
  if (isObservable(val)) {
    return val;
  }

  if (isPromise(val)) {
    return from(val);
  }

  return of(val);
}
