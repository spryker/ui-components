import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { DropdownItem } from '@spryker/dropdown';
import { ToJson } from '@spryker/utils';
import {
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  mapTo,
  pluck,
  shareReplay,
  startWith,
  switchMap,
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
  TableComponent,
  TableConfig,
  TableDataConfig,
  TableDataRow,
  TableRowAction,
  TableRowActionBase,
} from './table';
import { TableEventBus } from './table-event-bus';
import {
  TableFeatureComponent,
  TableFeatureEventBus,
} from './table-feature.component';
import { TableFeatureDirective } from './table-feature.directive';

export enum TableFeatureLocation {
  top = 'top',
  beforeTable = 'before-table',
  headerExt = 'header-ext',
  beforeColsHeader = 'before-cols-header',
  beforeCols = 'before-cols',
  afterColsHeader = 'after-cols-header',
  afterCols = 'after-cols',
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
export class CoreTableComponent implements TableComponent, OnInit, OnChanges {
  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;
  /**
   * {
   *    selectable: () => ...,
   *    'selectable:bla': () => ...,
   * }
   */
  @Input() events: Record<string, ((data: unknown) => void) | undefined> = {};

  @Output() actionTriggered = new EventEmitter<TableActionTriggeredEvent>();

  @ContentChildren(ColTplDirective) set slotTemplates(
    val: QueryList<ColTplDirective>,
  ) {
    this.templatesObj = val.reduce(
      (templates, slot) => ({
        ...templates,
        [slot.spyColTpl]: slot.template,
      }),
      {},
    );
  }

  @ContentChildren(TableFeatureDirective)
  set featureDirectives(featureDirectives: QueryList<TableFeatureDirective>) {
    this.updateFeatures(featureDirectives.map(feature => feature.component));
  }

  featureLocation = TableFeatureLocation;
  featureComponentType = TableFeatureComponent;

  private setConfig$ = new ReplaySubject<TableConfig>(1);
  config$ = this.setConfig$.pipe(shareReplaySafe());

  error$ = new Subject<unknown>();

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
    shareReplaySafe(),
  );

  total$ = this.data$.pipe(pluck('total'));
  pageSize$ = this.data$.pipe(pluck('pageSize'));
  page$ = this.data$.pipe(pluck('page'));
  tableData$ = this.data$.pipe(pluck('data'));

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  features: TableFeatureComponent[] = [];
  rowClasses: Record<string, Record<string, boolean>> = {};
  actions?: DropdownItem[];

  private handleStreamError = () => (error: unknown) => {
    this.error$.next(error);
    return EMPTY;
  };

  private handleEvent = (event: string, data: unknown) => {
    const eventHandler = this.events[event];
    eventHandler?.(data);
  };

  // We rely here on order to have the handler ready
  // tslint:disable-next-line: member-ordering
  private tableEventBus = new TableEventBus(this.handleEvent);

  constructor(
    private cdr: ChangeDetectorRef,
    private dataFetcherService: TableDataFetcherService,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
    private tableActionService: TableActionService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.dataConfiguratorService.triggerInitialData(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.setConfig$.next(this.config);
      this.updateActions();
    }
  }

  updateRowClasses(rowIdx: string, classes: Record<string, boolean>) {
    this.setRowClasses(rowIdx, { ...this.rowClasses[rowIdx], ...classes });
  }

  setRowClasses(rowIdx: string, classes: Record<string, boolean>) {
    this.rowClasses[rowIdx] = classes;
    this.cdr.markForCheck();
  }

  getTableId(): string | undefined {
    return this.tableId;
  }

  emitEvent<T = unknown>(featureName: string, data: T, eventName?: string) {
    const eventHash = eventName ? `${featureName}:${eventName}` : featureName;
    const eventHandler = this.events[eventHash];

    eventHandler?.(data);
  }

  /** @internal */
  updateActions(): void {
    this.actions = this.config?.rowActions?.map(({ id, title }) => ({
      action: id,
      title,
    }));
  }

  /** @internal */
  updateFeatures(features: TableFeatureComponent[]) {
    this.features = features;

    this.features.forEach(feature => this.initFeature(feature));
  }

  /** @internal */
  updateSorting(event: {
    key: string;
    value: 'descend' | 'ascend' | null;
  }): void {
    const { key, value } = event;
    const sortingCriteria: SortingCriteria = {
      sortBy: value ? key : undefined,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(sortingCriteria as TableDataConfig);
  }

  /** @internal */
  updatePagination(page: number): void {
    this.dataConfiguratorService.changePage(page);
  }

  /** @internal */
  updatePageSize(pageSize: number): void {
    this.dataConfiguratorService.update({ pageSize, page: 1 });
  }

  /** @internal */
  trackByColumns(index: number, item: TableColumn): string {
    return item.id;
  }

  /** @internal */
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

  private initFeature(feature: TableFeatureComponent) {
    feature.setTableComponent(this);
    feature.setTableEventBus(
      new TableFeatureEventBus(feature.name, this.tableEventBus),
    );
    feature.setColumnsResolverService(this.columnsResolverService);
    feature.setDataFetcherService(this.dataFetcherService);
    feature.setDataConfiguratorService(this.dataConfiguratorService);
  }
}
