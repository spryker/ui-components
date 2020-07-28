import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { HttpClient } from '@angular/common/http';
import { AjaxActionService, AjaxActionResponse } from '@spryker/ajax-action';
import { TableUrlAction } from './types';

/**
 * Handles url request via {@link HttpClient} and sends response to the {@link TableActionTriggeredEvent}
 */
@Injectable({
  providedIn: 'root',
})
export class TableUrlActionHandlerService
  implements TableActionHandler<TableUrlAction>, OnDestroy {
  private destroyed$ = new Subject<void>();
  private request$ = new Observable<AjaxActionResponse>().pipe(
    takeUntil(this.destroyed$),
  );

  constructor(
    private http: HttpClient,
    private ajaxActionService: AjaxActionService,
  ) {}

  handleAction(
    actionEvent: TableActionTriggeredEvent<TableUrlAction>,
    injector: Injector,
  ): Observable<unknown> {
    const actionData = actionEvent.action.typeOptions;

    this.request$ = this.http
      .request<AjaxActionResponse>(
        actionData.method || 'GET',
        actionData.url,
        {},
      )
      .pipe(catchError(response => of(response)));

    this.request$.subscribe(response =>
      this.ajaxActionService.handle(response, injector),
    );

    return of([]);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
