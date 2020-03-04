import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TableColumn, TableColumns, TableConfig, TableData } from './table';
import { merge, Observable } from 'rxjs';
import { ToJson } from '@spryker/utils';

import { HttpClient } from '@angular/common/http';
import { TableDataFetcherService } from './table.data.fetcher.service';
import { TableDataConfiguratorService } from './table.data.configurator.service';
import { TableColumnsResolverService } from './table.columns.resolver.service';
import { mapTo, shareReplay, startWith, tap } from 'rxjs/operators';

export interface TableComponent {
  tableId: string;

  selectionChange: EventEmitter<TableData>;

  getTableId(): string;

  toggleCheckedRows(isChecked: boolean): void;

  updateCheckedRows(): void;
}

@Component({
  selector: 'spy-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    TableDataFetcherService,
    TableDataConfiguratorService,
    TableColumnsResolverService,
  ],
})
export class TableComponent implements OnInit {
  @Input() @ToJson() config: TableConfig = {
    dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
    colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
    cols: [],
    selectable: true,
  };
  @Output() selectionChange = new EventEmitter<TableData>();
  @Output() actionTriggered = new EventEmitter<TableData>();

  allChecked = false;
  isIndeterminate = false;
  checkedRows: Record<TableColumn['id'], boolean> = {};

  columns$ = new Observable<TableColumns>();
  data$ = new Observable<TableData>();
  isLoading$ = new Observable<boolean>();

  constructor(
    private http: HttpClient,
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
  ) {}

  private initCheckedRows(data: TableData) {
    let lengthOfRows = data.data.length;

    while (lengthOfRows--) {
      this.checkedRows[lengthOfRows] = false;
    }

    this.allChecked = false;
    this.isIndeterminate = false;
  }

  ngOnInit(): void {
    const colsOrUrl = this.config.colsUrl || this.config.cols;

    this.data$ = this.dataFetcherService.resolve(this.config.dataUrl).pipe(
      tap(data => this.initCheckedRows(data)),
      shareReplay(),
    );
    this.columns$ = this.columnsResolverService
      .resolve(<string | TableColumns>colsOrUrl)
      .pipe(shareReplay());
    this.dataConfiguratorService.changePage(0);
    this.isLoading$ = this.isLoading();
  }

  private isLoading() {
    return merge(
      this.dataConfiguratorService.config$.pipe(mapTo(true)),
      this.data$.pipe(mapTo(false)),
    ).pipe(startWith(false));
  }

  toggleCheckedRows(): void {
    this.selectionChange.emit();

    this.isIndeterminate = false;
    Object.keys(this.checkedRows).forEach(
      key => (this.checkedRows[key] = this.allChecked),
    );
  }

  updateCheckedRows(): void {
    this.selectionChange.emit();

    const valuesOfCheckedRows = Object.values(this.checkedRows);
    const isUncheckedExist = valuesOfCheckedRows.some(checkbox => !checkbox);
    const checkedArrayLength = valuesOfCheckedRows.filter(checkbox => checkbox)
      .length;

    this.allChecked = !isUncheckedExist;

    if (checkedArrayLength) {
      this.isIndeterminate = isUncheckedExist;

      return;
    }

    this.isIndeterminate = false;
  }

  updateSorting(event: { key: string; value: 'descend' | 'ascend' | null }) {
    const { key, value } = event;
    const sortingData = {
      sortBy: key,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(sortingData);
  }

  private sortingValueTransformation(value: 'descend' | 'ascend' | null) {
    if (value === 'descend') {
      return 'desc';
    }

    if (value === 'ascend') {
      return 'asc';
    }

    return undefined;
  }

  updatePagination(page: number): void {
    this.dataConfiguratorService.changePage(page);
  }

  trackByColumns(index: number, item: TableColumn) {
    return item.id;
  }

  trackByData(index: number) {
    return index;
  }
}
