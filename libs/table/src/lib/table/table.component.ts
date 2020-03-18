import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import {
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  of,
  ReplaySubject,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  mapTo,
  shareReplay,
  startWith,
  switchMap,
  tap,
  pluck,
} from 'rxjs/operators';

import { TableActionService } from './action.service';
import { ColTplDirective } from './col-tpl.directive';
import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDataFetcherService } from './data-fetcher.service';
import {
  SortingCriteria,
  TableActionTriggeredEvent,
  TableColumn,
  TableColumnTplContext,
  TableConfig,
  TableData,
  TableDataConfig,
  TableDataRow,
  TableRowAction,
  TableRowActionBase,
} from './table';
import { TableFeatureComponent } from './table-feature.component';
import { TableFeatureDirective } from './table-feature.directive';
import { DropdownItem } from '@spryker/dropdown';

export enum TableFeatureLocation {
  top = 'top',
  headerExt = 'header-ext',
  afterTable = 'after-table',
  bottom = 'bottom',
  hidden = 'hidden',
}

const shareReplaySafe: <T>() => MonoTypeOperatorFunction<T> = () =>
  shareReplay({ bufferSize: 1, refCount: true });

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
export class TableComponent implements OnInit, OnChanges, AfterContentInit {
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
  featureComponentType = TableFeatureComponent;

  private setConfig$ = new ReplaySubject<TableConfig>(1);
  config$ = this.setConfig$.pipe(shareReplaySafe());

  columnsConfig$ = this.config$.pipe(
    map(config => config.columns || config.columnsUrl),
    distinctUntilChanged(),
    shareReplaySafe(),
  );

  columns$ = this.columnsConfig$.pipe(
    switchMap(colsOrUrl =>
      colsOrUrl
        ? this.columnsResolverService
            .resolve(colsOrUrl)
            .pipe(catchError(this.handleStreamError()))
        : of([]),
    ),
    shareReplaySafe(),
  );

  dataUrl$ = this.config$.pipe(
    map(config => config.dataUrl),
    distinctUntilChanged(),
    shareReplaySafe(),
  );

  data$ = this.dataUrl$.pipe(
    switchMap(dataUrl =>
      this.dataFetcherService
        .resolve(dataUrl)
        .pipe(catchError(this.handleStreamError())),
    ),
    tap(data => {
      this.initCheckedRows(data);
      this.rowsData = data.data;
      this.updateCheckedRowsArr();
    }),
    shareReplaySafe(),
  );

  total$ = this.data$.pipe(pluck('total'));
  size$ = this.data$.pipe(pluck('size'));
  offset$ = this.data$.pipe(pluck('offset'));
  tableData$ = this.data$.pipe(pluck('data'));

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  allChecked = false;
  isIndeterminate = false;
  checkedRows: Record<TableColumn['id'], boolean> = {};
  checkedRowsArr: TableDataRow[] = [];
  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  featuresLocation: Record<string, TableFeatureComponent[]> = {};
  actions?: DropdownItem[];

  private rowsData: TableDataRow[] = [];

  handleStreamError = () => (error: any) => EMPTY;

  constructor(
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
    private tableActionService: TableActionService,
  ) {}

  ngAfterContentInit(): void {
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
    setTimeout(() => this.dataConfiguratorService.changePage(0), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.setConfig$.next(this.config);
      this.updateActions();
    }
  }

  updateActions(): void {
    this.actions = this.config?.rowActions?.map(({ id, title }) => ({
      action: id,
      title,
    }));
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

    this.selectionChange.emit(this.checkedRowsArr);
  }

  updateCheckedRows(): void {
    const valuesOfCheckedRows = Object.values(this.checkedRows);
    const uncheckedRows = valuesOfCheckedRows.filter(checkbox => !checkbox);
    const isUncheckedExist = uncheckedRows.length > 0;
    const checkedArrayLength =
      valuesOfCheckedRows.length - uncheckedRows.length;

    this.allChecked = !isUncheckedExist;

    this.updateCheckedRowsArr();

    this.selectionChange.emit(this.checkedRowsArr);

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
  }

  updateSorting(event: {
    key: string;
    value: 'descend' | 'ascend' | null;
  }): void {
    const { key, value } = event;
    const sortingCriteria: SortingCriteria = {
      sortBy: key,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(sortingCriteria as TableDataConfig);
  }

  updatePagination(page: number): void {
    this.dataConfiguratorService.changePage(page);
  }

  updatePaginationSize(size: number): void {
    this.dataConfiguratorService.update({ size });
  }

  getTableId(): string | undefined {
    return this.tableId;
  }

  trackByColumns(index: number, item: TableColumn): string {
    return item.id;
  }

  actionTriggerHandler(actionId: TableRowAction, items: TableDataRow[]): void {
    if (!this.config?.rowActions) {
      return;
    }

    const action: TableRowActionBase = this.config.rowActions.filter(
      rowAction => rowAction.id === actionId,
    )[0];

    if (!action) {
      return;
    }

    const event: TableActionTriggeredEvent = {
      action,
      items,
    };
    const wasActionHandled = this.tableActionService.handle(event);

    if (!wasActionHandled) {
      this.actionTriggered.emit(event);
    }
  }

  private initCheckedRows(data: TableData): void {
    let uninitedRowsLength = data.data.length;

    while (uninitedRowsLength--) {
      this.checkedRows[uninitedRowsLength] = false;
    }

    this.allChecked = false;
    this.isIndeterminate = false;
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
