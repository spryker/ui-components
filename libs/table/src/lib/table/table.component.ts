import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
  AfterContentInit,
  TemplateRef,
} from '@angular/core';
import {
  TableActionTriggeredEvent,
  TableColumn,
  TableColumns,
  TableConfig,
  TableData,
  TableDataRow,
  TableRowActionBase,
  SortingCriteria,
  TableDataConfig,
  TableColumnTplContext,
} from './table';
import { merge, Observable } from 'rxjs';
import { ToJson } from '@spryker/utils';
import { HttpClient } from '@angular/common/http';
import { TableDataFetcherService } from './table.data.fetcher.service';
import { TableDataConfiguratorService } from './table.data.configurator.service';
import { TableColumnsResolverService } from './table.columns.resolver.service';
import { mapTo, shareReplay, startWith, tap } from 'rxjs/operators';
import { TableActionService } from './table.action.service';
import { ColTplDirective } from './col.tpl.directive';

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
    TableActionService,
  ],
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() tableId = '';
  @Input() @ToJson() config: TableConfig = {
    dataUrl: 'https://angular-recipe-24caa.firebaseio.com/data.json',
    colsUrl: 'https://angular-recipe-24caa.firebaseio.com/col.json',
    selectable: true,
  };

  @Output() selectionChange = new EventEmitter<TableDataRow[]>();
  @Output() actionTriggered = new EventEmitter<TableActionTriggeredEvent>();
  @ContentChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;

  allChecked = false;
  isIndeterminate = false;
  checkedRows: Record<TableColumn['id'], boolean> = {};

  columns$ = new Observable<TableColumns>();
  data$ = new Observable<TableData>();
  isLoading$ = new Observable<boolean>();

  private rowsData?: TableDataRow[];
  private templatesObj?: {
    [key: string]: TemplateRef<TableColumnTplContext>;
  };

  constructor(
    private http: HttpClient,
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
    private tableActionService: TableActionService,
  ) {}

  ngAfterContentInit() {
    this.templatesObj = this.slotTemplates?.reduce(
      (templates, template) => ({
        ...templates,
        [template.colTpl]: template.template,
      }),
      {},
    );
  }

  private initCheckedRows(data: TableData) {
    let uninitedRowsLength = data.data.length;

    while (uninitedRowsLength--) {
      this.checkedRows[uninitedRowsLength] = false;
    }

    this.allChecked = false;
    this.isIndeterminate = false;
  }

  ngOnInit(): void {
    const colsOrUrl = this.config.colsUrl || this.config.cols;

    this.data$ = this.dataFetcherService.resolve(this.config.dataUrl).pipe(
      tap(data => {
        this.initCheckedRows(data);
        this.rowsData = data.data;
      }),
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

  private selectedRows() {
    return this.rowsData?.filter((item, index) => this.checkedRows[index]);
  }

  toggleCheckedRows(): void {
    let unchangedRowsLength = Object.keys(this.checkedRows).length;

    this.selectionChange.emit(this.selectedRows());

    this.isIndeterminate = false;

    while (unchangedRowsLength--) {
      this.checkedRows[unchangedRowsLength] = this.allChecked;
    }
  }

  updateCheckedRows(): void {
    this.selectionChange.emit(this.selectedRows());

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
    const sortingCriteria: SortingCriteria = {
      sortBy: key,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(<TableDataConfig>sortingCriteria);
  }

  private sortingValueTransformation(
    value: 'descend' | 'ascend' | null,
  ): SortingCriteria['sortDirection'] {
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

  getTableId(): string {
    return this.tableId;
  }

  private trackByColumns(index: number, item: TableColumn) {
    return item.id;
  }

  private trackByData(index: number) {
    return index;
  }

  private actionTriggerHandler(
    action: TableRowActionBase,
    items: TableDataRow[],
  ) {
    const event: TableActionTriggeredEvent = {
      action,
      items,
    };
    const wasActionHandled = this.tableActionService.handle(event);

    if (!wasActionHandled) {
      this.actionTriggered.emit(event);
    }
  }
}
