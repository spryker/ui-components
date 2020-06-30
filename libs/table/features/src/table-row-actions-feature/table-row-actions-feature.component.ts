import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  TableDataRow,
  TableFeatureComponent,
  TableFeatureConfig,
  TableFeatureLocation,
  TableActionTriggeredEvent,
  TableRowAction,
  TableRowActionBase,
  TableActionsService,
  TableRowClickEvent,
} from '@spryker/table';
import {
  pluck,
  map,
  shareReplay,
  takeUntil,
  switchMap,
  withLatestFrom,
  take,
} from 'rxjs/operators';
import { DropdownItem } from '@spryker/dropdown';
import { Observable, Subject, combineLatest, EMPTY } from 'rxjs';
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
export class TableRowActionsFeatureComponent
  extends TableFeatureComponent<TableRowActionsConfig>
  implements OnDestroy, OnInit {
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
  private destroyed$ = new Subject<void>();
  private configClick$ = this.config$.pipe(pluck('click'));
  private clickAction$ = this.configClick$.pipe(
    map(actionId => this.getActionById(actionId as TableRowAction)),
  );
  private rowClicks$ = this.tableEventBus$.pipe(
    withLatestFrom(this.clickAction$),
    switchMap(([tableEventBus, action]) =>
      action
        ? tableEventBus.on<TableRowClickEvent>('table', 'row-click')
        : EMPTY,
    ),
  );

  tableData$ = this.table$.pipe(
    switchMap(table => table.data$),
    pluck('data'),
  );

  constructor(
    private tableActionsService: TableActionsService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.rowClicks$
      .pipe(
        o$ => combineLatest([o$, this.clickAction$.pipe(take(1))]),
        takeUntil(this.destroyed$),
      )
      .subscribe(([{ row }, action]) => {
        const event: TableActionTriggeredEvent = {
          // tslint:disable-next-line: no-non-null-assertion
          action: action!,
          items: [row],
        };

        this.triggerEvent(event);
      });

    this.tableData$
      .pipe(withLatestFrom(this.configClick$), takeUntil(this.destroyed$))
      .subscribe(([data, click]) =>
        data.forEach((element, index) =>
          this.table?.updateRowClasses(`${index}`, {
            'ant-table-row--clickable': Boolean(click),
          }),
        ),
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private getActionById(
    actionId: TableRowAction,
  ): TableRowActionBase | undefined {
    return (this.config?.actions as TableRowActionBase[]).filter(
      rowAction => rowAction.id === actionId,
    )[0];
  }

  actionTriggerHandler(actionId: TableRowAction, items: TableDataRow[]): void {
    const action = this.getActionById(actionId);

    if (!action) {
      return;
    }

    const event: TableActionTriggeredEvent = {
      action,
      items,
    };

    this.triggerEvent(event);
  }

  triggerEvent(actions: TableActionTriggeredEvent): void {
    this.tableActionsService.handle(actions);
  }
}
