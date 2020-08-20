import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, catchError, shareReplay } from 'rxjs/operators';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService, AjaxActionResponse } from '@spryker/ajax-action';
import { TableUrlAction } from './types';

/**
 * Handles url request via {@link HttpClient} and sends response to the {@link AjaxActionService}
 */
@Injectable({
  providedIn: 'root',
})
export class TableUrlActionHandlerService
  implements TableActionHandler<TableUrlAction>, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private ajaxActionService: AjaxActionService,
  ) {}

  handleAction(
    actionEvent: TableActionTriggeredEvent<TableUrlAction>,
    injector: Injector,
  ): Observable<unknown> {
    const actionData = actionEvent.action.typeOptions;
    const request$ = this.http
      .request<AjaxActionResponse>(
        actionData.method || 'GET',
        actionData.url,
        {},
      )
      .pipe(
        catchError(response => of(response)),
        shareReplay({ bufferSize: 1, refCount: true }),
      );

    request$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(response => this.ajaxActionService.handle(response, injector));

    return request$;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
