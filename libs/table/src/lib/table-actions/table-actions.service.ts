import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ActionsService } from '@spryker/actions';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { TableEventBus } from '../table/table-event-bus';
import { TableActionTriggeredEvent } from './types';

/**
 * Invokes appropriate {@link ActionHandler}
 * from all registered handlers in {@link ActionsService}
 */
@Injectable({
    providedIn: 'root',
})
export class TableActionsService implements OnDestroy {
    tableEventBus?: TableEventBus;

    triggerAction$ = new ReplaySubject<{
        actionEvent: TableActionTriggeredEvent;
        context: unknown;
    }>(1);

    destroyed$ = new Subject<void>();
    action$ = this.triggerAction$.pipe(
        switchMap(({ actionEvent, context }) =>
            this.actionsService.trigger(this.injector, actionEvent.action, context),
        ),
    );

    constructor(private injector: Injector, private actionsService: ActionsService) {
        this.action$.pipe(takeUntil(this.destroyed$)).subscribe();
    }

    /**
     * Handle actions of {@link ActionsService}
     * and calls {@method trigger} of {@link ActionHandler}
     * provided from {@link ActionTypesToken}
     */
    trigger(actionEvent: TableActionTriggeredEvent, context?: unknown): Observable<unknown> {
        if (this.actionsService.isActionRegisteredType(actionEvent.action.type)) {
            this.triggerAction$.next({
                actionEvent,
                context,
            });

            return this.action$;
        }

        this.tableEventBus?.emit<TableActionTriggeredEvent>('table', actionEvent, actionEvent.action.type);
        this.tableEventBus?.emit<TableActionTriggeredEvent>('table', actionEvent);

        return of(void 0);
    }

    /**
     * Sets {@link TableEventBus} that comes from {@link TableComponent}
     */
    _setEventBus(tableEventBus: TableEventBus): void {
        this.tableEventBus = tableEventBus;
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }
}
