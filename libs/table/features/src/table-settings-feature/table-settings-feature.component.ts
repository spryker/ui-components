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
  TableColumn,
} from '@spryker/table';
import { IconSettingsModule, IconResetModule } from '@spryker/icon/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableSettingsConfig } from './types';
import { switchMap, pluck, tap, withLatestFrom, map } from 'rxjs/operators';
import { ReplaySubject, of, Observable, merge, combineLatest } from 'rxjs';
import { PersistenceService } from '@spryker/utils';
import { PopoverPosition } from '@spryker/popover';

export interface TableColumnWithHiddenProp extends TableColumn {
  hidden?: boolean;
}

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
  tableFeatureLocation = TableFeatureLocation;
  popoverPosition = PopoverPosition.BottomRight;

  originalColumnsArr: TableColumns = [];

  setColumns$ = new ReplaySubject<TableColumns>(1);
  setInitialColumns$ = new ReplaySubject<TableColumns>(1);

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
  ) as Observable<TableColumns>;

  initialColumns$ = combineLatest([
    this.storageState$,
    this.setInitialColumns$,
  ]).pipe(
    map(([storageColumns, initialColumns]) => storageColumns || initialColumns),
  );

  columns$ = merge(
    this.setColumns$,
    this.initialColumns$.pipe(map(columns => [...columns])),
  );

  setPopoverColumns$ = new ReplaySubject<TableColumnWithHiddenProp[]>(1);
  popoverColumns$ = merge(this.initialColumns$, this.setPopoverColumns$).pipe(
    withLatestFrom(this.tableId$),
    tap(([columns, tableId]) => this.persistenceService.save(tableId, columns)),
    map(([columns]) => columns),
  );

  constructor(
    private persistenceService: PersistenceService,
    injector: Injector,
  ) {
    super(injector);
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    super.setColumnsResolverService(service);

    service.addTransformer(columnsArr => {
      this.originalColumnsArr = columnsArr;

      this.setInitialColumns$.next([...columnsArr]);
      return this.columns$;
    });
  }

  drop(
    event: CdkDragDrop<string[]>,
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
  ): void {
    moveItemInArray(popoverColumns, event.previousIndex, event.currentIndex);
    const sortedTableColumns = this.moveItemInTableColumnsArray(
      popoverColumns,
      tableColumns,
    );

    this.setPopoverColumns$.next(popoverColumns);
    this.setColumns$.next(sortedTableColumns);
  }

  resetChoice(): void {
    this.setColumns$.next([...this.originalColumnsArr]);
    this.setPopoverColumns$.next([...this.originalColumnsArr]);
  }

  handleCheckChange(
    checkedColumn: TableColumnWithHiddenProp,
    popoverColumns: TableColumnWithHiddenProp[],
    tableColumns: TableColumns,
  ): void {
    console.log(popoverColumns === tableColumns);

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

  private showColumn(
    index: number,
    column: TableColumn,
    tableColumns: TableColumns,
  ): void {
    tableColumns.splice(index, 0, column as any);
  }

  private hideColumn(index: number, tableColumns: TableColumns): void {
    tableColumns.splice(index, 1);
  }

  private findIndexToInsert(
    checkedColumn: TableColumn,
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
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
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
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
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
  ): TableColumns {
    return popoverColumns.filter(column =>
      tableColumns.find(tableColumn => tableColumn.id === column.id),
    );
  }
}
