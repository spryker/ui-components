import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableDataRow,
  TableFeatureComponent,
  TableFeatureConfig,
  TableFeatureLocation,
} from '@spryker/table';
import {
  TableActionTriggeredEvent,
  TableRowAction,
  TableRowActionBase,
} from './types';
import { TableActionService } from './action.service';
import { pluck, map, shareReplay } from 'rxjs/operators';
import { DropdownItem } from '@spryker/dropdown';
import { Observable } from 'rxjs';
import { IconActionModule } from '@spryker/icon/icons';

declare module '@spryker/table' {
  interface TableConfig {
    rowActions?: TableRowActionsConfig;
  }
}

export interface TableRowActionsConfig extends TableFeatureConfig {
  actions?: TableRowActionBase[];
  click?: string;
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
export class TableRowActionsFeatureComponent extends TableFeatureComponent<
  TableRowActionsConfig
> {
  name = 'rowActions';
  tableFeatureLocation = TableFeatureLocation;
  triggerIcon = IconActionModule.icon;

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

    this.tableEventBus?.on('table', 'row-click');
    this.triggerEvent(event);
  }

  triggerEvent(actions: TableActionTriggeredEvent): void {
    const wasActionHandled = this.tableActionService.handle(actions);

    if (!wasActionHandled) {
      this.tableEventBus?.emit<TableActionTriggeredEvent>(
        actions,
        actions.action.type,
      );
      this.tableEventBus?.emit<TableActionTriggeredEvent>(actions);
    }
  }
}
