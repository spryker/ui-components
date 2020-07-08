import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableActionBase,
  TableActionsService,
  TableActionTriggeredEvent,
  TableFeatureComponent,
  TableFeatureConfig,
  TableFeatureLocation,
} from '@spryker/table';
import { ContextService } from '@spryker/utils';
import { combineLatest, Observable } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  TableSelectionChangeEvent,
  TableSelectionRow,
} from '../table-selectable-feature';

declare module '@spryker/table' {
  interface TableConfig {
    batchActions?: TableBatchActionsConfig;
  }
}

export interface TableBatchActionsConfig extends TableFeatureConfig {
  actions: TableBatchAction[];
  rowIdPath: string;
  noActionsMessage?: string;
  availableActionsPath?: string;
}

export interface TableBatchAction extends TableActionBase {
  title: string;
}

export interface TableBatchActionContext {
  rowIds: string[];
}

export interface SelectedRows
  extends Record<string, unknown>,
    TableSelectionRow {}

export interface TableItemActions {
  actions: TableBatchAction[];
  rowIdPath: string;
  selectedRows: SelectedRows[];
}

/**
 * Component hooks into the Table Selectable Feature and renders Bulk Action Buttons for selected rows based on the Table Configuration.
 *
 * Once the Bulk Action Button is clicked - action is pre-processed via {@link ContextService} and handled via {@link TableActionService}.
 *
 * When there are no relevant actions available for selected rows - an inline notification via must be shown with appropriate message from the Table Configuration.
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
    switchMap(tableEventBus =>
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
        ? this.getAvailableActions(selectedRows, config)
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
    map(itemActions =>
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

      return shouldShowNotification ? config.noActionsMessage : false;
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
          order: 1,
          padding: '0 20px',
        };
      }

      if (noActionsMessage) {
        return {
          order: 1,
          width: '100%',
          paddingTop: '30px',
          marginBottom: '-30px',
        };
      }

      return { order: 1 };
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
    config: TableBatchActionsConfig,
  ): TableBatchAction[] {
    const availableActionIds = selectedRows.reduce((ids: string[][], row) => {
      const availableActions = this.contextService.interpolateExpression(
        // tslint:disable-next-line: no-non-null-assertion
        config.availableActionsPath!,
        row.data as any,
      );

      return !Array.isArray(availableActions)
        ? ids
        : [...ids, availableActions];
    }, []);

    if (!availableActionIds.length) {
      return config.actions;
    }

    return config.actions.filter(action =>
      availableActionIds.every(item => item.includes(action.id)),
    );
  }

  /**
   * Prepares Event Object {@link TableActionTriggeredEvent<TableBatchAction>} and triggers this object via {@link TableActionsService.trigger()} API.
   */
  buttonClickHandler(action: TableBatchAction, batchAction: TableItemActions) {
    const batchTypeOptions: Record<string, unknown> = { ...action.typeOptions };
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
