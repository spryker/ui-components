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
  TableColumnWithHiddenProp,
} from '@spryker/table';
import { IconSettingsModule, IconResetModule } from '@spryker/icon/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableSettingsConfig } from './types';
import { switchMap, pluck, tap, withLatestFrom, map } from 'rxjs/operators';
import { ReplaySubject, of, Observable, merge, combineLatest } from 'rxjs';
import { LocalStoragePersistenceStrategy } from '@spryker/utils';

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
  popoverPosition = 'bottomRight';

  originalColumnsArr: TableColumns = [];

  setColumns$ = new ReplaySubject<TableColumns>(1);
  setInitialColumns$ = new ReplaySubject<TableColumns>(1);

  tableId$ = this.config$.pipe(
    pluck('tableId'),
    switchMap(tableId => {
      if (tableId) {
        return of(tableId);
      }

      return this.table$.pipe(switchMap(table => table.tableId$));
    }),
  );

  storageState$ = this.tableId$.pipe(
    switchMap(tableId =>
      this.localStoragePersistenceStrategy.retrieve(tableId),
    ),
  ) as Observable<TableColumns>;

  initialColumns$ = combineLatest([
    this.storageState$,
    this.setInitialColumns$,
  ]).pipe(
    map(([storageColumns, initialColumns]) => storageColumns || initialColumns),
  );

  columns$ = merge(this.setColumns$, this.initialColumns$).pipe(
    withLatestFrom(this.tableId$),
    tap(([columns, tableId]) =>
      this.localStoragePersistenceStrategy.save(tableId, columns),
    ),
    map(([columns]) => columns),
  );

  setPopoverColumns$ = new ReplaySubject<TableColumnWithHiddenProp[]>(1);
  popoverColumns$ = merge(this.initialColumns$, this.setPopoverColumns$);

  constructor(
    private localStoragePersistenceStrategy: LocalStoragePersistenceStrategy,
    injector: Injector,
  ) {
    super(injector);
  }

  setColumnsResolverService(service: TableColumnsResolverService): void {
    super.setColumnsResolverService(service);

    const transformer = (columnsArr: TableColumns) => {
      this.originalColumnsArr = columnsArr;

      this.setInitialColumns$.next([...columnsArr]);
      return this.columns$;
    };
    service.addTransformer(transformer);
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
    const popoverColumn = popoverColumns.find(
      column => column.id === checkedColumn.id,
    );
    const tableColumnElem = tableColumns.find(
      elem => elem.id === checkedColumn.id,
    );

    if (checkedColumn.hidden) {
      this.showColumn(
        this.findIndexToInsert(
          checkedColumn,
          popoverColumns,
          tableColumns,
        ) as number,
        checkedColumn,
        tableColumns,
      );
    } else {
      if (tableColumnElem) {
        this.hideColumn(tableColumns.indexOf(tableColumnElem), tableColumns);
      }
    }

    if (popoverColumn) {
      popoverColumn.hidden = !popoverColumn.hidden;
    }

    this.setColumns$.next(tableColumns);
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
  ): number | void {
    const popoverColumn = popoverColumns.find(
      column => column.id === checkedColumn.id,
    );
    const popoverColumnIndex =
      popoverColumn && popoverColumns.indexOf(popoverColumn);
    return !popoverColumnIndex
      ? popoverColumnIndex
      : this.findNewColumnPosition(
          popoverColumnIndex,
          popoverColumns,
          tableColumns,
        );
  }

  private findNewColumnPosition(
    index: number,
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
  ): number | void {
    if (!index) {
      return 0;
    }

    const previousElem = popoverColumns[index - 1];
    const tableColumnsElement =
      previousElem && tableColumns.find(elem => elem.id === previousElem.id);

    if (tableColumnsElement) {
      return tableColumns.indexOf(tableColumnsElement) + 1;
    }

    this.findNewColumnPosition(index - 1, popoverColumns, tableColumns);
  }

  private moveItemInTableColumnsArray(
    popoverColumns: TableColumns,
    tableColumns: TableColumns,
  ): TableColumns {
    const newTableColumnsArr: TableColumns = [];

    popoverColumns.forEach(column => {
      if (tableColumns.find(tableColumn => tableColumn.id === column.id)) {
        newTableColumnsArr.push(column);
      }
    });

    return newTableColumnsArr;
  }
}
