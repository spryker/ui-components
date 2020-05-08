import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableActionService,
  TableActionTriggeredEvent,
  TableDataRow,
  TableFeatureComponent,
  TableFeatureLocation,
} from '@spryker/table';
import { TableRowAction, TableRowActionBase } from './types';
import { pluck, map, shareReplay } from 'rxjs/operators';
import { DropdownItem } from '@spryker/dropdown';
import { Observable } from 'rxjs';

declare module '@spryker/table' {
  // tslint:disable-next-line: no-empty-interface
  interface TableConfig extends TableRowActionsConfig {}
}

export interface TableRowActionsConfig {
  rowActions?: {
    enabled: boolean;
    actions?: TableRowActionBase[];
  };
}

@Component({
  selector: 'spy-table-row-actions-feature',
  templateUrl: './table-row-actions-feature.component.html',
  styleUrls: ['./table-row-actions-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableRowActionsFeatureComponent,
    },
  ],
})
export class TableRowActionsFeatureComponent extends TableFeatureComponent {
  name = 'rowActions';
  tableFeatureLocation = TableFeatureLocation;

  actions$: Observable<DropdownItem[]> = this.config$.pipe(
    pluck('actions'),
    map(actions =>
      (actions as TableRowActionBase[]).map(({ id: action, title }) => ({
        action,
        title,
      })),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  constructor(
    private tableActionService: TableActionService,
    injector: Injector,
  ) {
    super(injector);
  }

  actionTriggerHandler(actionId: TableRowAction, items: TableDataRow[]): void {
    if (!this.actions$) {
      return;
    }

    const action: TableRowActionBase = (this.config
      ?.actions as TableRowActionBase[]).filter(
      rowAction => rowAction.id === actionId,
    )[0];

    if (!action) {
      return;
    }

    const event: TableActionTriggeredEvent = {
      action,
      items,
    };

    const wasActionHandled = this.tableActionService.handle(event);

    if (!wasActionHandled) {
      this.tableEventBus?.emit<TableActionTriggeredEvent>(event);
    }
  }
}
