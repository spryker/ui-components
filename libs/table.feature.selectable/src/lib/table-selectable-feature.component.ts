import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    OnDestroy,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import {
    TableColumn,
    TableComponent,
    TableData,
    TableDataRow,
    TableFeatureComponent,
    TableFeatureLocation,
} from '@spryker/table';
import { Subject, takeUntil } from 'rxjs';

import { TableSelectableConfig, TableSelectionRow, TableSelectionChangeEvent } from './types';

@Component({
    standalone: false,
    selector: 'spy-table-selectable-feature',
    templateUrl: './table-selectable-feature.component.html',
    styleUrls: ['./table-selectable-feature.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: TableFeatureComponent,
            useExisting: TableSelectableFeatureComponent,
        },
    ],
})
export class TableSelectableFeatureComponent extends TableFeatureComponent<TableSelectableConfig> implements OnDestroy {
    protected cdr = inject(ChangeDetectorRef);

    name = 'itemSelection';
    tableFeatureLocation = TableFeatureLocation;

    allChecked = false;
    isIndeterminate = false;
    checkedRows: Record<TableColumn['id'], boolean> = {};
    checkedRowsArr: TableSelectionRow[] = [];

    private destroyed$ = new Subject<void>();
    private rowsData: TableDataRow[] = [];

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    setTableComponent(table: TableComponent): void {
        super.setTableComponent(table);

        table.data$.pipe(takeUntil(this.destroyed$)).subscribe((data) => this.resetCheckedRows(data));
    }

    toggleCheckedAll(): void {
        this.isIndeterminate = false;

        Object.keys(this.checkedRows).forEach((i) => (this.checkedRows[i] = this.allChecked));

        this.updateChecks();
    }

    updateCheckedRows(): void {
        const valuesOfCheckedRows = Object.values(this.checkedRows);
        const uncheckedRows = valuesOfCheckedRows.filter((checkbox) => !checkbox);
        const isUncheckedExist = uncheckedRows.length > 0;
        const checkedArrayLength = valuesOfCheckedRows.length - uncheckedRows.length;

        this.allChecked = !isUncheckedExist;
        this.isIndeterminate = checkedArrayLength ? isUncheckedExist : false;

        this.updateChecks();
    }

    private updateChecks(): void {
        this.updateRowClasses();
        this.updateCheckedRowsArr();
        this.cdr.markForCheck();

        this.tableEventBus?.emit<TableSelectionChangeEvent>(this.checkedRowsArr);
    }

    private updateRowClasses(): void {
        Object.keys(this.checkedRows).forEach((i) =>
            this.table?.updateRowClasses(i, {
                'ant-table-row--selected': this.checkedRows[i],
            }),
        );
    }

    private updateCheckedRowsArr(): void {
        this.checkedRowsArr = Object.keys(this.checkedRows)
            .filter((idx) => this.checkedRows[idx])
            .map((idx) => ({
                data: this.rowsData[Number(idx)],
                index: Number(idx),
            }));
    }

    private resetCheckedRows(data: TableData): void {
        this.rowsData = data.data;
        this.checkedRows = {};
        this.checkedRowsArr = [];
        this.allChecked = false;
        this.isIndeterminate = false;

        data.data.forEach((_, i) => (this.checkedRows[i] = false));

        this.updateChecks();
    }
}
