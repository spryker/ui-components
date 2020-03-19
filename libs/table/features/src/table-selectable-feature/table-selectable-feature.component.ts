import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableColumn,
  TableComponent,
  TableData,
  TableDataRow,
  TableFeatureComponent,
} from '@spryker/table';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

declare module '@spryker/table' {
  interface TableConfig extends TableSelectableConfig {}
}

export interface TableSelectableConfig {
  selectable?: boolean;
}

export type TableSelectionChangeEvent = TableDataRow[];

@Component({
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
export class TableSelectableFeatureComponent extends TableFeatureComponent
  implements OnDestroy {
  @Output() selectionChange = new EventEmitter<TableDataRow[]>();

  allChecked = false;
  isIndeterminate = false;
  checkedRows: Record<TableColumn['id'], boolean> = {};
  checkedRowsArr: TableDataRow[] = [];

  private destroyed$ = new Subject<void>();
  private rowsData: TableDataRow[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  setTableComponent(table: TableComponent) {
    super.setTableComponent(table);

    table.data$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => this.resetCheckedRows(data));

    (this.table?.config$ as Observable<TableSelectableConfig>)
      .pipe(
        map(config => (config.selectable != null ? config.selectable : true)),
        distinctUntilChanged(),
        takeUntil(this.destroyed$),
      )
      .subscribe(selectable => {
        this.locations.forEach(location =>
          table.disableFeatureAt(location, this, selectable),
        );
      });
  }

  toggleCheckedAll(): void {
    this.isIndeterminate = false;

    Object.keys(this.checkedRows).forEach(
      i => (this.checkedRows[i] = this.allChecked),
    );

    this.updateChecks();
  }

  updateCheckedRows(): void {
    const valuesOfCheckedRows = Object.values(this.checkedRows);
    const uncheckedRows = valuesOfCheckedRows.filter(checkbox => !checkbox);
    const isUncheckedExist = uncheckedRows.length > 0;
    const checkedArrayLength =
      valuesOfCheckedRows.length - uncheckedRows.length;

    this.allChecked = !isUncheckedExist;
    this.isIndeterminate = checkedArrayLength ? isUncheckedExist : false;

    this.updateChecks();
  }

  private updateChecks() {
    this.updateRowClasses();
    this.selectionChange.emit(this.getCheckedRowsArr());
    this.cdr.detectChanges();
  }

  private updateRowClasses() {
    Object.keys(this.checkedRows).forEach(i => {
      this.table?.updateRowClasses(i, {
        'ant-table-row--selected': this.checkedRows[i],
      });
    });
  }

  private getCheckedRowsArr() {
    return Object.keys(this.checkedRows)
      .filter(idx => this.checkedRows[idx])
      .map(idx => this.rowsData[Number(idx)]);
  }

  private resetCheckedRows(data: TableData): void {
    this.rowsData = data.data;
    this.allChecked = false;
    this.isIndeterminate = false;

    data.data.forEach((_, i) => (this.checkedRows[i] = false));

    this.updateChecks();
  }
}
