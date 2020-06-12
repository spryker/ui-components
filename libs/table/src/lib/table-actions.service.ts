import { Injectable, Inject, Optional, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableDataRow } from './table/table';
import {
  TableActionBase,
  TableActionsDeclaration,
  TableActionTriggeredEvent,
} from './types';
import { InjectionTokenType } from '@spryker/utils';
import { TableActionsToken } from './tokens';
import { TableEventBus } from './table/table-event-bus';

@Injectable({
  providedIn: 'root',
})
export class TableActionsService {
  actionHandlers: TableActionsDeclaration =
    this.actionHandlersToken?.reduce(
      (actionHandlers, actionHandler) => ({
        ...actionHandlers,
        ...actionHandler,
      }),
      {},
    ) || {};
  tableEventBus?: TableEventBus;

  constructor(
    private injector: Injector,
    @Inject(TableActionsToken)
    @Optional()
    private actionHandlersToken: InjectionTokenType<
      typeof TableActionsToken
    > | null,
  ) {}

  handle(actionEvent: TableActionTriggeredEvent): Observable<unknown> {
    const actionHandler = this.actionHandlers[
      actionEvent.action.type as string
    ];

    if (actionHandler) {
      const actionHandlerService = this.injector.get(actionHandler);

      return actionHandlerService.handleAction(actionEvent);
    }

    this.tableEventBus?.emit<TableActionTriggeredEvent>(
      'table',
      actionEvent,
      actionEvent.action.type,
    );
    this.tableEventBus?.emit<TableActionTriggeredEvent>('table', actionEvent);

    return of(null);
  }

  _setEventBus(tableEventBus: TableEventBus): void {
    this.tableEventBus = tableEventBus;
  }
}
