import { Injectable, Injector } from '@angular/core';
import { ActionsService } from '@spryker/actions';
import { Observable, of } from 'rxjs';

import { TableEventBus } from '../table/table-event-bus';
import { TableActionTriggeredEvent } from './types';

/**
 * Invokes appropriate {@link TableFormOverlayActionHandlerService}
 * from all registered handlers in {@link TableActionsToken}
 */
@Injectable({
  providedIn: 'root',
})
export class TableActionsService {
  tableEventBus?: TableEventBus;

  constructor(
    private injector: Injector,
    private actionsService: ActionsService,
  ) {}

  /**
   * Handle actions of {@link TableComponent}
   * and calls {@method handleAction} of {@link TableFormOverlayActionHandlerService}
   * provided from {@link TableActionsToken}
   */
  trigger(
    actionEvent: TableActionTriggeredEvent,
    context?: unknown,
  ): Observable<unknown> {
    if (this.actionsService.isActionRegisteredType(actionEvent.action.type)) {
      return this.actionsService.trigger(
        this.injector,
        actionEvent.action,
        context,
      );
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
