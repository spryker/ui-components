import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import {
  InterceptionEventType,
  InterceptionHandler,
  Interceptor,
  InterceptorDispatcher,
} from './types';

/**
 * Allows to dispatch any kind of events from one entity and then be intercepted from another entity to control it’s timing and/or cancel them.
 * Implements {@link InterceptorDispatcherService} and  {@link InterceptorService} and acts as a mediator between the entities in play.
 */
@Injectable({ providedIn: 'root' })
export class InterceptionService implements InterceptorDispatcher, Interceptor {
  private handlersMap$ = new BehaviorSubject(
    new Map<any, InterceptionHandler<any>[]>(),
  );

  dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  dispatch<D extends never>(event: InterceptionEventType<D>): Observable<void>;
  dispatch(
    event: InterceptionEventType<unknown>,
    data?: unknown,
  ): Observable<unknown> {
    return this.handlersMap$
      .pipe(
        map(handlersMap => handlersMap.get(event) || []),
        switchMap(h => {
          return h.reduce(
            (prev$, handler) =>
              prev$.pipe(switchMap(handlerData => handler(handlerData))),
            of(data),
          );
        }),
      )
      .pipe(take(1));
  }

  intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void> {
    return new Observable(subscriber => {
      const handlers = this.handlersMap$.getValue().get(event) || [];
      this.handlersMap$.next(
        this.handlersMap$.getValue().set(event, [...handlers, handler]),
      );

      return () => {
        const updatedHandlers = this.handlersMap$.getValue().get(event) || [];
        const filteredHandlers = updatedHandlers.filter(h => h !== handler);

        this.handlersMap$.next(
          this.handlersMap$.getValue().set(event, filteredHandlers),
        );
      };
    });
  }
}

/**
 * Allows to dispatch events for others to be intercepted.
 */
@Injectable({ providedIn: 'root', useExisting: InterceptionService })
export abstract class InterceptorDispatcherService
  implements InterceptorDispatcher {
  abstract dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  abstract dispatch<D extends never>(
    event: InterceptionEventType<D>,
  ): Observable<void>;
}

/**
 * Allows to intercept dispatched events.
 */
@Injectable({ providedIn: 'root', useExisting: InterceptionService })
export abstract class InterceptorService implements Interceptor {
  abstract intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void>;
}
