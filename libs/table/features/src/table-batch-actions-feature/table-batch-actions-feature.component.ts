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
import { Observable } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  TableSelectionRow,
  TableSelectionChangeEvent,
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

export interface TableItemActions {
  actions: TableBatchAction[];
  rowIdPath: string;
  selectedRows: TableSelectionRow[];
}

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
  noActionsMessage$ = this.config$.pipe(pluck('noActionsMessage'));
  itemSelected$ = this.tableEventBus$.pipe(
    switchMap(tableEventBus =>
      tableEventBus
        .on<TableSelectionChangeEvent>('itemSelection')
        .pipe(shareReplay({ bufferSize: 1, refCount: true })),
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

      if (config.availableActionsPath) {
        const availableActionIds = selectedRows.reduce(
          (ids: string[], row) => [
            ...ids,
            this.contextService.interpolateExpression(
              // tslint:disable-next-line: no-non-null-assertion
              config.availableActionsPath!,
              row.data as any,
            ) as string,
          ],
          [],
        );

        const availableActions = config.actions.reduce(
          (actions: TableBatchAction[], action) => {
            const isAvailable = availableActionIds.every((item: string) =>
              item.includes(action.id),
            );

            if (isAvailable) {
              return [...actions, action];
            }

            return actions;
          },
          [],
        );

        return {
          actions: availableActions,
          rowIdPath: config.rowIdPath,
          selectedRows: selectedRows,
        };
      }

      return {
        actions: config.actions,
        rowIdPath: config.rowIdPath,
        selectedRows: selectedRows,
      };
    }),
  );

  constructor(
    injector: Injector,
    private tableActionService: TableActionsService,
    private contextService: ContextService,
  ) {
    super(injector);
  }

  buttonClickHandler(action: TableBatchAction, batchAction: TableItemActions) {
    const rowIdPath = batchAction.rowIdPath;
    const batchTypeOptions: Record<string, unknown> = { ...action.typeOptions };
    const rowIds = batchAction.selectedRows.reduce(
      (ids: string[], row: TableSelectionRow) => [
        ...ids,
        this.contextService.interpolateExpression(
          rowIdPath,
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

    console.log(batchEvent);

    // this.tableActionService.trigger(batchData);
  }
}
