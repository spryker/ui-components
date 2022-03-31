import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActionsService } from '@spryker/actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AjaxActionResponse } from './types';

/**
 * Triggers actions via {@link ActionsService}
 */
@Injectable({
  providedIn: 'root',
})
export class AjaxActionService implements OnDestroy {
  private destroyed$ = new Subject<void>();

  handle(
    response: AjaxActionResponse,
    injector: Injector,
    context?: unknown,
  ): void {
    if (!response.actions) {
      return;
    }

    const actionsService = injector.get(ActionsService);

    for (const action of response.actions ?? []) {
      actionsService
        .trigger(injector, action, context)
        .pipe(takeUntil(this.destroyed$))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
