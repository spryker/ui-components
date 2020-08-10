import { Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  InterceptionEventType,
  InterceptionHandler,
  Interceptor,
  InterceptorDispatcher,
} from './types';

@Injectable({ providedIn: 'root' })
export class InterceptionService implements InterceptorDispatcher, Interceptor {
  private handlersMap = new Map<any, InterceptionHandler<any>[]>();

  dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  dispatch<D extends never>(event: InterceptionEventType<D>): Observable<void>;
  dispatch(
    event: InterceptionEventType<unknown>,
    data?: unknown,
  ): Observable<unknown> {
    const handlers = this.handlersMap.get(event) || [];

    return handlers
      .reduce(
        // tslint:disable-next-line: no-shadowed-variable
        (prev$, handler) => prev$.pipe(switchMap(data => handler(data))),
        of(data),
      )
      .pipe(take(1));
  }

  intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void> {
    return new Observable(subscriber => {
      const handlers = this.handlersMap.get(event) || [];
      this.handlersMap.set(event, [...handlers, handler]);

      return () => {
        // tslint:disable-next-line: no-shadowed-variable
        const handlers = this.handlersMap.get(event) || [];
        this.handlersMap.set(
          event,
          handlers.filter(h => h !== handler),
        );
      };
    });
  }
}

@Injectable({ providedIn: 'root', useExisting: InterceptionService })
export abstract class InterceptorDispatcherService
  implements InterceptorDispatcher {
  abstract dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  abstract dispatch<D extends never>(
    event: InterceptionEventType<D>,
  ): Observable<void>;
}

@Injectable({ providedIn: 'root', useExisting: InterceptionService })
export abstract class InterceptorService implements Interceptor {
  abstract intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void>;
}

export function provideInterceptionService(): Provider[] {
  return [
    { provide: InterceptionService, useClass: InterceptionService },
    {
      provide: InterceptorDispatcherService,
      useExisting: InterceptionService,
    },
    { provide: InterceptorService, useExisting: InterceptionService },
  ];
}
