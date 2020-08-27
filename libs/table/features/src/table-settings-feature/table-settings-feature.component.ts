import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Injector,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableFeatureLocation,
  TableColumns,
  TableColumnsResolverService,
} from '@spryker/table';
import {
  IconSettingsModule,
  IconResetModule,
  IconDragModule,
} from '@spryker/icon/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  TableSettingsConfig,
  TableSettingsColumn,
  TableSettingsColumns,
} from './types';
import {
  switchMap,
  pluck,
  tap,
  withLatestFrom,
  map,
  shareReplay,
  mapTo,
  take,
} from 'rxjs/operators';
import { ReplaySubject, of, Observable, merge, combineLatest } from 'rxjs';
import { PersistenceService } from '@spryker/utils';
import { PopoverPosition } from '@spryker/popover';

@Component({
  selector: 'spy-table-settings-feature',
  templateUrl: './table-settings-feature.component.html',
  styleUrls: ['./table-settings-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableSettingsFeatureComponent,
    },
  ],
})
export class TableSettingsFeatureComponent extends TableFeatureComponent<
  TableSettingsConfig
> {
  name = 'columnConfigurator';
  settingsIcon = IconSettingsModule.icon;
  resetIcon = IconResetModule.icon;
  dragIcon = IconDragModule.icon;
  tableFeatureLocation = TableFeatureLocation;
  popoverPosition = PopoverPosition.BottomRight;
  popoverOpened = false;
  isResetDisabled = true;

  originalColumnsArr: TableSettingsColumns = [];

  setColumns$ = new ReplaySubject<TableSettingsColumns>(1);
  setInitialColumns$ = new ReplaySubject<TableSettingsColumns>(1);

  tableId$ = this.config$.pipe(
    pluck('tableId'),
    switchMap(tableId =>
      tableId
        ? of(tableId)
        : this.table$.pipe(switchMap(table => table.tableId$)),
    ),
  );

  storageState$ = this.tableId$.pipe(
    switchMap(tableId => this.persistenceService.retrieve(tableId)),
  ) as Observable<TableSettingsColumns>;

  initialColumns$ = combineLatest([
    this.storageState$,
    this.setInitialColumns$,
  ]).pipe(
    map(([storageColumns, initialColumns]) => storageColumns || initialColumns),
  );

  columns$ = merge(
    this.setColumns$,
    this.initialColumns$.pipe(
      map(columns => {
        const filteredColumns = columns.filter(column => !column.hidden);
        this.isResetDisabled = !filteredColumns.some(
          (column, index) => column.id !== this.originalColumnsArr[index].id,
        );

        return filteredColumns;
      }),
    ),
  );

  setPopoverColumns$ = new ReplaySubject<TableSettingsColumns>(1);
  popoverColumns$ = merge(this.initialColumns$, this.setPopoverColumns$).pipe(
    withLatestFrom(this.tableId$),
    tap(([columns, tableId]) => this.persistenceService.save(tableId, columns)),
    map(([columns]) => columns),
  );

  tableData$ = this.table$.pipe(
    switchMap(table => table.data$),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));

  constructor(
    private persistenceService: PersistenceService,
    injector: Injector,
  ) {
    super(injector);
  }

  openPopover(): void {
    this.popoverOpened = !this.popoverOpened;
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    super.setColumnsResolverService(service);

    service.addTransformer(columnsArr => {
      this.originalColumnsArr = columnsArr as TableSettingsColumns;

      this.setInitialColumns$.next(
        this.cloneColumns(columnsArr) as TableSettingsColumns,
      );
      return this.columns$ as Observable<TableColumns>;
    });
  }

  drop(
    event: CdkDragDrop<string[]>,
    popoverColumns: TableSettingsColumns,
    tableColumns: TableSettingsColumns,
  ): void {
    this.isResetDisabled = false;

    moveItemInArray(popoverColumns, event.previousIndex, event.currentIndex);
    const sortedTableColumns = this.moveItemInTableColumnsArray(
      popoverColumns,
      tableColumns,
    );

    this.setPopoverColumns$.next(popoverColumns);
    this.setColumns$.next(sortedTableColumns);
  }

  resetChoice(): void {
    this.isResetDisabled = true;
    this.setColumns$.next(this.cloneColumns(this.originalColumnsArr));
    this.setPopoverColumns$.next(this.cloneColumns(this.originalColumnsArr));
  }

  handleCheckChange(
    checkedColumn: TableSettingsColumn,
    popoverColumns: TableSettingsColumns,
    tableColumns: TableSettingsColumns,
  ): void {
    this.isResetDisabled = false;

    const popoverColumn = popoverColumns.find(
      column => column.id === checkedColumn.id,
    );
    const tableColumnElem = tableColumns.find(
      elem => elem.id === checkedColumn.id,
    );

    if (checkedColumn.hidden && !tableColumnElem) {
      this.showColumn(
        this.findIndexToInsert(checkedColumn, popoverColumns, tableColumns),
        checkedColumn,
        tableColumns,
      );
    }

    if (tableColumnElem) {
      this.hideColumn(tableColumns.indexOf(tableColumnElem), tableColumns);
    }

    if (popoverColumn) {
      popoverColumn.hidden = !popoverColumn.hidden;
    }

    this.setColumns$.next(tableColumns);
    this.setPopoverColumns$.next(popoverColumns);
  }

  private cloneColumns(columns: TableSettingsColumns): TableSettingsColumns {
    return columns.map(column => ({ ...column }));
  }

  private showColumn(
    index: number,
    column: TableSettingsColumn,
    tableColumns: TableSettingsColumns,
  ): void {
    tableColumns.splice(index, 0, column as any);
  }

  private hideColumn(index: number, tableColumns: TableSettingsColumns): void {
    tableColumns.splice(index, 1);
  }

  private findIndexToInsert(
    checkedColumn: TableSettingsColumn,
    popoverColumns: TableSettingsColumns,
    tableColumns: TableSettingsColumns,
  ): number {
    const popoverColumn = popoverColumns.find(
      column => column.id === checkedColumn.id,
    );
    const popoverColumnIndex =
      popoverColumn && popoverColumns.indexOf(popoverColumn);

    return popoverColumnIndex !== 0
      ? this.findNewColumnPosition(
          popoverColumns,
          tableColumns,
          popoverColumnIndex,
        )
      : popoverColumnIndex;
  }

  private findNewColumnPosition(
    popoverColumns: TableSettingsColumns,
    tableColumns: TableSettingsColumns,
    index?: number,
  ): number {
    if (!index) {
      return 0;
    }

    for (let i = index; i >= 0; i--) {
      const previousElem = popoverColumns[i];
      const tableColumnsElement =
        previousElem && tableColumns.find(elem => elem.id === previousElem.id);

      if (tableColumnsElement) {
        return tableColumns.indexOf(tableColumnsElement) + 1;
      }
    }

    return 0;
  }

  private moveItemInTableColumnsArray(
    popoverColumns: TableSettingsColumns,
    tableColumns: TableSettingsColumns,
  ): TableSettingsColumns {
    return popoverColumns.filter(column =>
      tableColumns.find(tableColumn => tableColumn.id === column.id),
    );
  }
}
