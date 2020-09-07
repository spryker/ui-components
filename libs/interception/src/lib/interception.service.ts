import { Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import {
  InterceptionEventType,
  InterceptionHandler,
  Interceptor,
  InterceptorDispatcher,
} from './types';

/**
 * allows to dispatch any kind of events from one entity and then be intercepted from another entity to control it’s timing and/or cancel them.
 * implements {@link InterceptorDispatcherService} and  {@link InterceptorService} and acts as a mediator between the entities in play
 */
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
        (prev$, handler) =>
          prev$.pipe(switchMap(handlerData => handler(handlerData))),
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
        const updatedHandlers = this.handlersMap.get(event) || [];

        this.handlersMap.set(
          event,
          updatedHandlers.filter(h => h !== handler),
        );
      };
    });
  }
}

/**
 * is used by the entities that wants to expose events for others to be intercepted
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
 * is used by the entities that want to intercept given events
 */
@Injectable({ providedIn: 'root', useExisting: InterceptionService })
export abstract class InterceptorService implements Interceptor {
  abstract intercept<D>(
    event: InterceptionEventType<D>,
    handler: InterceptionHandler<D>,
  ): Observable<void>;
}

export function provideInterceptionService(): Provider[] {
  return [
    InterceptionService,
    {
      provide: InterceptorDispatcherService,
      useExisting: InterceptionService,
    },
    { provide: InterceptorService, useExisting: InterceptionService },
  ];
}
