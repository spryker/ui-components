import { Injectable, Inject, Optional, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TableActionsDeclaration, TableActionTriggeredEvent } from './types';
import { InjectionTokenType } from '@spryker/utils';
import { TableActionsToken } from './tokens';
import { TableEventBus } from '../table/table-event-bus';

/**
 * Invokes appropriate {@link TableFormOverlayActionHandlerService}
 * from all registered handlers in {@link TableActionsToken}
 */
@Injectable({
  providedIn: 'root',
})
export class TableActionsService {
  /**
   * Merge tokens array {@link TableActionsToken} objects into one object by overriding keys
   */
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

  /**
   * Handle actions of {@link TableComponent}
   * and calls {@method handleAction} of {@link TableFormOverlayActionHandlerService}
   * provided from {@link TableActionsToken}
   */
  trigger(actionEvent: TableActionTriggeredEvent): Observable<unknown> {
    const actionHandler = this.actionHandlers[
      actionEvent.action.type as string
    ];

    if (actionHandler) {
      const actionHandlerService = this.injector.get(actionHandler);

      return actionHandlerService.handleAction(actionEvent, this.injector);
    }

    this.tableEventBus?.emit<TableActionTriggeredEvent>(
      'table',
      actionEvent,
      actionEvent.action.type,
    );
    this.tableEventBus?.emit<TableActionTriggeredEvent>('table', actionEvent);

    return of(null);
  }

  /**
   * Sets {@link TableEventBus} that comes from {@link TableComponent}
   */
  _setEventBus(tableEventBus: TableEventBus): void {
    this.tableEventBus = tableEventBus;
  }
}
