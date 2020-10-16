import {
  Injectable,
  Inject,
  Optional,
  Injector,
  OnDestroy,
} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { TableActionsDeclaration, TableActionTriggeredEvent } from './types';
import { InjectionTokenType } from '@spryker/utils';
import { TableActionsToken } from './tokens';
import { TableEventBus } from '../table/table-event-bus';
import { shareReplay, takeUntil } from 'rxjs/operators';

/**
 * Invokes appropriate {@link TableFormOverlayActionHandlerService}
 * from all registered handlers in {@link TableActionsToken}
 */
@Injectable()
export class TableActionsService implements OnDestroy {
  /**
   * Merge tokens array {@link TableActionsToken} objects into one object by overriding keys
   */
  private actionHandlersTypes: TableActionsDeclaration =
    this.actionHandlersArr?.reduce<TableActionsDeclaration>(
      (prevActionHandlers, actionHandlers) => ({
        ...prevActionHandlers,
        ...actionHandlers,
      }),
      Object.create(null),
    ) ?? Object.create(null);

  private actionHandlers = Object.fromEntries(
    Object.entries(
      this.actionHandlersTypes,
    ).map(([type, actionHandlerType]) => [
      type,
      this.injector.get(actionHandlerType),
    ]),
  );

  private tableEventBus?: TableEventBus;

  private destroyed$ = new Subject<void>();

  constructor(
    private injector: Injector,
    @Inject(TableActionsToken)
    @Optional()
    private actionHandlersArr: InjectionTokenType<
      typeof TableActionsToken
    > | null,
  ) {
    // Initialize Action Handlers
    setTimeout(() =>
      Object.values(this.actionHandlers).forEach(actionHandler =>
        actionHandler.tableInit?.(this.injector),
      ),
    );
  }

  ngOnDestroy(): void {
    // Dispose Action Handlers
    Object.values(this.actionHandlers).forEach(actionHandler =>
      actionHandler.tableDispose?.(this.injector),
    );
  }

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
      const action$ = actionHandler
        .handleAction(actionEvent, this.injector)
        .pipe(
          shareReplay({ refCount: true, bufferSize: 1 }),
          takeUntil(this.destroyed$),
        );

      // Kickstart the action
      // so subscription is not required on outside
      action$.subscribe();

      return action$;
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
