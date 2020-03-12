import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import { merge, Observable } from 'rxjs';
import { mapTo, shareReplay, startWith, tap } from 'rxjs/operators';

import { TableActionService } from './action.service';
import { ColTplDirective } from './col-tpl.directive';
import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDataFetcherService } from './data-fetcher.service';
import {
  SortingCriteria,
  TableActionTriggeredEvent,
  TableColumn,
  TableColumns,
  TableColumnTplContext,
  TableConfig,
  TableData,
  TableDataConfig,
  TableDataRow,
  TableRowActionBase,
} from './table';
import { TableFeatureComponent } from './table-feature.component';
import { TableFeatureDirective } from './table-feature.directive';

export enum TableFeatureLocation {
  top = 'top',
  headerExt = 'header-ext',
  afterTable = 'after-table',
  bottom = 'bottom',
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
    TableActionService,
  ],
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;

  @Output() selectionChange = new EventEmitter<TableDataRow[]>();
  @Output() actionTriggered = new EventEmitter<TableActionTriggeredEvent>();
  @ContentChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;

  @ContentChildren(TableFeatureDirective)
  set featureDirectives(featureDirectives: QueryList<TableFeatureDirective>) {
    this.updateFeaturesLocation(
      featureDirectives.map(feature => feature.component),
    );
  }

  featureLocation = TableFeatureLocation;
  components = TableFeatureComponent;

  columns$ = new Observable<TableColumns>();
  data$ = new Observable<TableData>();
  isLoading$ = new Observable<boolean>();
  allChecked = false;
  isIndeterminate = false;
  checkedRows: Record<TableColumn['id'], boolean> = {};
  checkedRowsArr: TableDataRow[] = [];
  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  featuresLocation: Record<string, TableFeatureComponent[]> = {};

  private rowsData: TableDataRow[] = [];

  constructor(
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
    private tableActionService: TableActionService,
  ) {}

  ngAfterContentInit() {
    if (!this.slotTemplates) {
      return;
    }

    this.templatesObj = this.slotTemplates.reduce(
      (templates, slot) => ({
        ...templates,
        [slot.spyColTpl]: slot.template,
      }),
      {},
    );
  }

  ngOnInit(): void {
    if (!this.config) {
      throw new Error(`TableComponent: No input config found!`);
    }

    const colsOrUrl = this.config.columnsUrl || this.config.columns;

    if (!colsOrUrl) {
      throw new Error(`TableComponent: No cols data found in input config!`);
    }

    this.data$ = this.dataFetcherService.resolve(this.config.dataUrl).pipe(
      tap(data => {
        this.initCheckedRows(data);
        this.rowsData = data.data;
      }),
      shareReplay(),
    );
    this.columns$ = this.columnsResolverService
      .resolve(colsOrUrl)
      .pipe(shareReplay());
    this.dataConfiguratorService.changePage(0);
    this.isLoading$ = this.isLoading();
  }

  updateFeaturesLocation(features: TableFeatureComponent[]): void {
    this.featuresLocation = features.reduce(
      (acc, feature) => ({
        ...acc,
        [feature.location]: feature,
      }),
      {},
    );
  }

  toggleCheckedRows(): void {
    let unchangedRowsLength = Object.keys(this.checkedRows).length;

    this.isIndeterminate = false;

    while (unchangedRowsLength--) {
      this.checkedRows[unchangedRowsLength] = this.allChecked;
    }

    this.updateCheckedRowsArr();
  }

  updateCheckedRows(): void {
    const valuesOfCheckedRows = Object.values(this.checkedRows);
    const isUncheckedExist = valuesOfCheckedRows.some(checkbox => !checkbox);
    const checkedArrayLength = valuesOfCheckedRows.filter(checkbox => checkbox)
      .length;

    this.allChecked = !isUncheckedExist;

    this.updateCheckedRowsArr();

    if (checkedArrayLength) {
      this.isIndeterminate = isUncheckedExist;

      return;
    }

    this.isIndeterminate = false;
  }

  updateCheckedRowsArr(): void {
    this.checkedRowsArr = Object.keys(this.checkedRows)
      .filter(idx => this.checkedRows[idx])
      .map(idx => this.rowsData[Number(idx)]);

    this.selectionChange.emit(this.checkedRowsArr);
  }

  updateSorting(event: { key: string; value: 'descend' | 'ascend' | null }) {
    const { key, value } = event;
    const sortingCriteria: SortingCriteria = {
      sortBy: key,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(<TableDataConfig>sortingCriteria);
  }

  updatePagination(page: number): void {
    this.dataConfiguratorService.changePage(page);
  }

  updatePaginationSize(size: number): void {
    this.dataConfiguratorService.update({ size });
  }

  getTableId() {
    return this.tableId;
  }

  trackByColumns(index: number, item: TableColumn) {
    return item.id;
  }

  trackByData(index: number) {
    return index;
  }

  actionTriggerHandler(action: TableRowActionBase, items: TableDataRow[]) {
    console.log(action);
    const event: TableActionTriggeredEvent = {
      action,
      items,
    };
    const wasActionHandled = this.tableActionService.handle(event);

    if (!wasActionHandled) {
      this.actionTriggered.emit(event);
    }
  }

  private actionTransformation(): any {
    return this.config?.rowActions?.map(({ id, title }) => ({ action: id, title }))
  }

  private initCheckedRows(data: TableData) {
    let uninitedRowsLength = data.data.length;

    while (uninitedRowsLength--) {
      this.checkedRows[uninitedRowsLength] = false;
    }

    this.allChecked = false;
    this.isIndeterminate = false;
  }

  private isLoading() {
    return merge(
      this.dataConfiguratorService.config$.pipe(mapTo(true)),
      this.data$.pipe(mapTo(false)),
    ).pipe(startWith(false));
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
}
