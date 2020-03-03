import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TableColumn, TableColumns, TableConfig, TableData } from './table';
import { Observable } from 'rxjs';
import { ToJson } from '@spryker/utils';

import { HttpClient } from '@angular/common/http';
import { TableDataFetcherService } from './table.data.fetcher.service';
import { TableDataConfiguratorService } from './table.data.configurator.service';
import { TableColumnsResolverService } from './table.columns.resolver.service';

interface SortingCriteria {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TableComponent {
  tableId: string;
  config: TableConfig;
  selectionChange: EventEmitter<TableData>;
  checkedRows: Record<TableColumn['id'], boolean>;
  allChecked: boolean;
  isIndeterminate: boolean;

  getTableId(): string;

  toggleCheckedRows(isChecked: boolean): void;

  updateCheckedRows(): void;

  // updateSorting(event: {
  //     key: string;
  //     value: 'descend' | 'ascend' | null;
  // }): void;
  //
  // updatePagination(page: number): void;
}

@Component({
  selector: 'spy-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableDataFetcherService, TableDataConfiguratorService, TableColumnsResolverService],
})
export class TableComponent implements OnInit {
  @Input() @ToJson() config: TableConfig = {
    dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
    colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
    cols: []
  };

  columns$: Observable<TableColumns> = new Observable();
  data$: Observable<TableData> = new Observable();

  constructor(
    private http: HttpClient,
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
  ) {}

  ngOnInit(): void {
    const colsOrUrl = this.config.colsUrl || this.config.cols;

    this.data$ = this.dataFetcherService.resolve(this.config.dataUrl);
    this.columns$ = this.columnsResolverService.resolve(<string | TableColumns>colsOrUrl);
    this.dataConfiguratorService.changePage(0);
  }

  updateSorting(event: { key: string; value: 'descend' | 'ascend' | null }) {
    const { key, value } = event;
    const sortingData = {
      sortBy: key,
      sortDirection: value,
    };

    this.dataConfiguratorService.update(sortingData);
  }

  updatePagination(page: number): void {
    this.dataConfiguratorService.changePage(page);
  }
}
