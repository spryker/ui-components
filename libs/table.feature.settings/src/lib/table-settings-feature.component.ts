import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injector } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation, TableColumns, TableColumnsResolverService } from '@spryker/table';
import { IconSettingsModule, IconResetModule, IconDragModule } from '@spryker/icon/icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TableSettingsConfig, TableSettingsColumn, TableSettingsColumns, TableSettingsChangeEvent } from './types';
import { switchMap, pluck, tap, withLatestFrom, map, shareReplay, mapTo, take } from 'rxjs/operators';
import { ReplaySubject, of, Observable, merge, combineLatest } from 'rxjs';
import { PersistenceService } from '@spryker/persistence';
import { PopoverPosition } from '@spryker/popover';

interface TableSettingsStorageData {
    hiddenColumns: string[];
    columnsOrder: string[];
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
export class TableSettingsFeatureComponent extends TableFeatureComponent<TableSettingsConfig> {
    name = 'columnConfigurator';
    settingsIcon = IconSettingsModule.icon;
    resetIcon = IconResetModule.icon;
    dragIcon = IconDragModule.icon;
    tableFeatureLocation = TableFeatureLocation;
    popoverPosition = PopoverPosition.BottomRight;
    popoverOpened = false;
    isResetDisabled = true;
    isColumnsRetrieved = false;

    originalColumnsArr: TableSettingsColumns = [];

    setColumns$ = new ReplaySubject<TableSettingsColumns>(1);
    setInitialColumns$ = new ReplaySubject<TableSettingsColumns>(1);

    tableId$ = this.config$.pipe(
        pluck('tableId'),
        switchMap((tableId) => (tableId ? of(tableId) : this.table$.pipe(switchMap((table) => table.tableId$)))),
    );

    storageState$ = this.tableId$.pipe(
        switchMap((tableId) => this.persistenceService.retrieve<TableSettingsStorageData>(tableId)),
        tap((storageData) => {
            if (storageData) {
                this.isColumnsRetrieved = true;
            }
        }),
    ) as Observable<TableSettingsStorageData>;

    initialColumns$ = combineLatest([this.storageState$, this.setInitialColumns$]).pipe(
        map(([storageData, initialColumns]) => this.applyStorageSettings(storageData, initialColumns)),
    );

    columns$ = merge(
        this.setColumns$,
        this.initialColumns$.pipe(map((columns) => columns.filter((column) => !column.hidden))),
    ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

    isResetButtonDisabled$ = this.columns$.pipe(
        map(
            (columns) =>
                columns.length === this.originalColumnsArr.length &&
                !columns.some((column, index) => column.id !== this.originalColumnsArr[index].id),
        ),
    );

    setPopoverColumns$ = new ReplaySubject<TableSettingsColumns>(1);
    popoverColumns$ = merge(this.initialColumns$, this.setPopoverColumns$).pipe(
        withLatestFrom(this.tableId$),
        tap(([columns, tableId]) => {
            if (!this.isColumnsRetrieved) {
                this.persistenceService.save(tableId, this.generateStorageData(columns));
            } else {
                this.isColumnsRetrieved = false;
            }
        }),
        map(([columns]) => {
            this.dataConfiguratorService?.update({ settings: columns });

            return columns;
        }),
    );

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));

    constructor(private persistenceService: PersistenceService, injector: Injector) {
        super(injector);
    }

    togglePopover(event: boolean): void {
        this.popoverOpened = event;
    }

    setColumnsResolverService(service: TableColumnsResolverService): void {
        super.setColumnsResolverService(service);

        service.addTransformer(this.settingsTransformer);
    }

    settingsTransformer = (columnsArr: TableColumns) => {
        this.originalColumnsArr = columnsArr as TableSettingsColumns;

        this.setInitialColumns$.next(this.cloneColumns(columnsArr) as TableSettingsColumns);

        return this.columns$ as Observable<TableColumns>;
    };

    drop(event: CdkDragDrop<string[]>, popoverColumns: TableSettingsColumns, tableColumns: TableSettingsColumns): void {
        moveItemInArray(popoverColumns, event.previousIndex, event.currentIndex);
        const sortedTableColumns = this.moveItemInTableColumnsArray(popoverColumns, tableColumns);

        this.setPopoverColumns$.next(popoverColumns);
        this.setColumns$.next(sortedTableColumns);
        this.tableEventBus?.emit<TableSettingsChangeEvent>({
            tableColumns: sortedTableColumns,
            popoverColumns,
        });
    }

    resetChoice(): void {
        this.setColumns$.next(this.cloneColumns(this.originalColumnsArr));
        this.setPopoverColumns$.next(this.cloneColumns(this.originalColumnsArr));
    }

    handleCheckChange(
        checkedColumn: TableSettingsColumn,
        popoverColumns: TableSettingsColumns,
        tableColumns: TableSettingsColumns,
    ): void {
        const popoverColumn = popoverColumns.find((column) => column.id === checkedColumn.id);
        const tableColumnElem = tableColumns.find((elem) => elem.id === checkedColumn.id);

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
        this.tableEventBus?.emit<TableSettingsChangeEvent>({
            tableColumns,
            popoverColumns,
            visibilityChanged: checkedColumn.id,
        });
    }

    private cloneColumns(columns: TableSettingsColumns): TableSettingsColumns {
        return columns.map((column) => ({ ...column }));
    }

    private showColumn(index: number, column: TableSettingsColumn, tableColumns: TableSettingsColumns): void {
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
        const popoverColumn = popoverColumns.find((column) => column.id === checkedColumn.id);
        const popoverColumnIndex = popoverColumn && popoverColumns.indexOf(popoverColumn);

        return popoverColumnIndex !== 0
            ? this.findNewColumnPosition(popoverColumns, tableColumns, popoverColumnIndex)
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
            const tableColumnsElement = previousElem && tableColumns.find((elem) => elem.id === previousElem.id);

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
        return popoverColumns.filter((column) => tableColumns.find((tableColumn) => tableColumn.id === column.id));
    }

    private generateStorageData(columns: TableSettingsColumns): TableSettingsStorageData {
        return columns.reduce(
            (accumulator: TableSettingsStorageData, column: TableSettingsColumn) => {
                if (column.hidden) {
                    accumulator.hiddenColumns = [...accumulator.hiddenColumns, column.id];
                }

                accumulator.columnsOrder = [...accumulator.columnsOrder, column.id];

                return accumulator;
            },
            {
                hiddenColumns: [],
                columnsOrder: [],
            },
        );
    }

    private applyStorageSettings(
        storageData: TableSettingsStorageData,
        columns: TableSettingsColumns,
    ): TableSettingsColumns {
        if (!storageData) {
            return columns;
        }

        const mappedColumns: TableSettingsColumns = [];

        storageData.columnsOrder.forEach((id) => {
            const nextColumn = columns.find((column) => column.id === id);

            if (nextColumn) {
                nextColumn.hidden = storageData.hiddenColumns.includes(nextColumn.id);

                mappedColumns.push(nextColumn);
            }
        });

        if (storageData.columnsOrder.length !== columns.length) {
            columns.map((column) => {
                if (!storageData.columnsOrder.includes(column.id)) {
                    mappedColumns.push(column);
                }
            });
        }

        return mappedColumns;
    }
}
