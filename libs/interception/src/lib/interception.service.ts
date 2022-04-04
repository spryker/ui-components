import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  mapTo,
  switchMap,
  take,
} from 'rxjs/operators';

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
  constructor(
    @Optional()
    @SkipSelf()
    private parentInterceptionService?: InterceptionService,
  ) {}

  private handlersMap$ = new BehaviorSubject(
    new Map<any, InterceptionHandler<any>[]>(),
  );

  private getHandlersForEvent(
    event: InterceptionEventType<unknown>,
  ): Observable<InterceptionHandler<any>[]> {
    return this.handlersMap$.pipe(
      take(1),
      map((handlersMap) => handlersMap.get(event) || []),
      distinctUntilChanged(),
    );
  }

  dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  dispatch<D extends never>(event: InterceptionEventType<D>): Observable<void>;
  dispatch(
    event: InterceptionEventType<unknown>,
    data?: unknown,
  ): Observable<unknown> {
    return this.getHandlersForEvent(event).pipe(
      switchMap((h) =>
        h.reduce(
          (prev$, handler) =>
            prev$.pipe(switchMap((handlerData) => handler(handlerData))),
          of(data),
        ),
      ),
    );
  }

  dispatchToAll<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  dispatchToAll<D extends never>(
    event: InterceptionEventType<D>,
  ): Observable<void>;
  dispatchToAll(
    event: InterceptionEventType<unknown>,
    data?: unknown,
  ): Observable<unknown> {
    return zip(
      this.parentInterceptionService?.dispatchToAll(event, data) ??
        this.getHandlersForEvent(event).pipe(mapTo(null)),
      this.dispatch(event, data),
    );
  }

  intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void> {
    return new Observable((subscriber) => {
      const handlers = this.handlersMap$.getValue().get(event) || [];
      this.handlersMap$.next(
        this.handlersMap$.getValue().set(event, [...handlers, handler]),
      );

      return () => {
        const updatedHandlers = this.handlersMap$.getValue().get(event) || [];
        const filteredHandlers = updatedHandlers.filter((h) => h !== handler);

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
  implements InterceptorDispatcher
{
  abstract dispatch<D>(event: InterceptionEventType<D>, data: D): Observable<D>;
  abstract dispatch<D extends never>(
    event: InterceptionEventType<D>,
  ): Observable<void>;

  abstract dispatchToAll<D>(
    event: InterceptionEventType<D>,
    data: D,
  ): Observable<D>;
  abstract dispatchToAll<D extends never>(
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
