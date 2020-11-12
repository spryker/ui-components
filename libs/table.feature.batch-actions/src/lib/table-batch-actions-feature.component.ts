import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableActionsService,
  TableActionTriggeredEvent,
  TableFeatureComponent,
  TableFeatureLocation,
} from '@spryker/table';
import {
  TableSelectionChangeEvent,
  TableSelectionRow,
} from '@spryker/table.feature.selectable';
import { ContextService, multipleIntersectionOfString } from '@spryker/utils';
import { combineLatest, Observable } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  TableBatchActionsConfig,
  TableItemActions,
  TableBatchAction,
  TableBatchActionContext,
  SelectedRows,
} from './types';

/**
 * Component hooks into the Table Selectable Feature and renders Bulk Action Buttons for selected rows based on the Table Configuration.
 *
 * Once the Bulk Action Button is clicked - action is pre-processed via {@link ContextService} and handled via {@link TableActionService}.
 *
 * When there are no relevant actions available for selected rows - an inline notification is shown with appropriate message from the Table Configuration.
 */
@Component({
  selector: 'spy-table-batch-actions-feature',
  templateUrl: './table-batch-actions-feature.component.html',
  styleUrls: ['./table-batch-actions-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableBatchActionsFeatureComponent,
    },
  ],
})
export class TableBatchActionsFeatureComponent extends TableFeatureComponent<
  TableBatchActionsConfig
> {
  name = 'batchActions';
  tableFeatureLocation = TableFeatureLocation;

  actions$ = this.config$.pipe(pluck('actions'));
  itemSelected$ = this.tableEventBus$.pipe(
    switchMap((tableEventBus) =>
      tableEventBus.on<TableSelectionChangeEvent>('itemSelection'),
    ),
  );
  itemActions$: Observable<TableItemActions> = this.itemSelected$.pipe(
    withLatestFrom(this.config$),
    map(([selectedRows, config]) => {
      if (!selectedRows.length) {
        return {
          actions: [],
          selectedRows: [],
          rowIdPath: '',
        };
      }

      const actions = config.availableActionsPath
        ? this.getAvailableActions(
            selectedRows,
            config.actions,
            config.availableActionsPath,
          )
        : config.actions;

      return {
        actions,
        rowIdPath: config.rowIdPath,
        selectedRows: selectedRows as SelectedRows[],
      };
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  shouldShowActions$ = this.itemActions$.pipe(
    map((itemActions) =>
      Boolean(itemActions.actions.length && itemActions.selectedRows.length),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  noActionsMessage$ = this.itemActions$.pipe(
    withLatestFrom(this.config$),
    map(([itemActions, config]) => {
      const shouldShowNotification = Boolean(
        !itemActions.actions.length && itemActions.selectedRows.length,
      );

      return shouldShowNotification ? config.noActionsMessage : undefined;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  styles$ = combineLatest([
    this.shouldShowActions$,
    this.noActionsMessage$,
  ]).pipe(
    map(([shouldShowActions, noActionsMessage]) => {
      if (shouldShowActions) {
        return {
          order: 2,
          padding: '0 20px',
        };
      }

      if (noActionsMessage) {
        return {
          order: 10,
          width: '100%',
          paddingTop: '30px',
          marginBottom: '-30px',
        };
      }

      return { order: 3 };
    }),
  );

  constructor(
    injector: Injector,
    private tableActionService: TableActionsService,
    private contextService: ContextService,
  ) {
    super(injector);
  }

  private getAvailableActions(
    selectedRows: TableSelectionRow[],
    actions: TableBatchAction[],
    availableActionsPath: string,
  ): TableBatchAction[] {
    const availableActionIds = selectedRows.reduce((ids: string[][], row) => {
      const availableActions = this.contextService.interpolateExpression(
        availableActionsPath,
        row.data as any,
      );

      return !Array.isArray(availableActions)
        ? ids
        : [...ids, availableActions];
    }, []);

    if (!availableActionIds.length) {
      return actions;
    }

    const intersection: Record<string, boolean> = multipleIntersectionOfString(
      availableActionIds,
    ).reduce((accumulator, value) => ({ ...accumulator, [value]: true }), {});

    return actions.filter((action) => intersection[action.id]);
  }

  /**
   * Prepares Event Object {@link TableActionTriggeredEvent<TableBatchAction>} and triggers this object via {@link TableActionsService.trigger()} API.
   */
  buttonClickHandler(action: TableBatchAction, batchAction: TableItemActions) {
    const batchTypeOptions: Record<string, unknown> = {
      ...(action.typeOptions as Record<string, unknown>),
    };
    const rowIds = batchAction.selectedRows.reduce(
      (ids: string[], row) => [
        ...ids,
        this.contextService.interpolateExpression(
          batchAction.rowIdPath,
          row.data as any,
        ) as string,
      ],
      [],
    );

    const context: TableBatchActionContext = {
      rowIds,
    };

    Object.entries(batchTypeOptions).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        return;
      }

      batchTypeOptions[key] = this.contextService.interpolate(
        value,
        context as any,
      );
    });

    const batchEvent: TableActionTriggeredEvent<TableBatchAction> = {
      action: {
        ...action,
        typeOptions: batchTypeOptions,
      },
      items: batchAction.selectedRows,
    };

    this.tableActionService.trigger(batchEvent);
  }
}
