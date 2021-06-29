import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActionHandler, ActionsService } from '@spryker/actions';
import { AnyContext, ContextService } from '@spryker/utils';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, concatAll, shareReplay, takeUntil } from 'rxjs/operators';

import { HttpActionConfig, HttpActionResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class HttpActionHandlerService
  implements ActionHandler<unknown, unknown>, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private http: HttpClient) {}

  handleAction(
    injector: Injector,
    config: HttpActionConfig,
    context: unknown,
  ): Observable<unknown> {
    config = { ...config };

    const contextService = injector.get(ContextService, null);
    const actionsService = injector.get(ActionsService, null);

    if (contextService) {
      config.url = contextService.interpolate(
        config.url,
        context as AnyContext,
      );
    }

    const request$ = this.http
      .request<HttpActionResponse>(config.method || 'GET', config.url)
      .pipe(
        catchError((response) => of(response)),
        shareReplay({ bufferSize: 1, refCount: true }),
      );

    request$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response: HttpActionResponse) => {
        const actions$ = response.actions?.map((action) =>
          actionsService?.trigger(injector, action, context),
        );

        if (!actions$?.length) {
          return of(void 0);
        }

        return combineLatest(actions$ as Observable<unknown>[]).pipe(
          concatAll(),
        );
      });

    return request$;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
