import {
  AfterContentInit,
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
  TableConfig,
  TableDataConfig,
  TableDataRow,
  TableRowAction,
  TableRowActionBase,
} from './table';
import { TableFeatureComponent } from './table-feature.component';
import { TableFeatureDirective } from './table-feature.directive';

export enum TableFeatureLocation {
  top = 'top',
  headerExt = 'header-ext',
  beforeCols = 'before-cols',
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
export class TableComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;

  @Output() selectionChange = new EventEmitter<TableDataRow[]>();
  @Output() actionTriggered = new EventEmitter<TableActionTriggeredEvent>();

  @ContentChildren(ColTplDirective) slotTemplates?: QueryList<ColTplDirective>;

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
  size$ = this.data$.pipe(pluck('size'));
  page$ = this.data$.pipe(pluck('page'));
  tableData$ = this.data$.pipe(pluck('data'));

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  featuresLocation: Record<string, TableFeatureComponent[]> = {};
  featuresDisabled: Record<string, Map<TableFeatureComponent, boolean>> = {};
  rowClasses: Record<string, Record<string, boolean>> = {};
  actions?: DropdownItem[];

  handleStreamError = () => (error: unknown) => {
    this.error$.next(error);
    return EMPTY;
  };

  constructor(
    private cdr: ChangeDetectorRef,
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
    setTimeout(() => this.dataConfiguratorService.changePage(1), 0);
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

  updateFeatures(features: TableFeatureComponent[]): void {
    this.featuresLocation = features.reduce(
      (acc, feature) =>
        feature.locations.reduce(
          (_acc, location) => ({
            ..._acc,
            [location]: acc[location] ? [...acc[location], feature] : [feature],
          }),
          acc,
        ),
      {} as TableComponent['featuresLocation'],
    );

    this.featuresDisabled = Object.keys(this.featuresLocation).reduce(
      (acc, location) => ({
        ...acc,
        [location]: new Map(
          this.featuresLocation[location].map(feature => [feature, false]),
        ),
      }),
      {} as TableComponent['featuresDisabled'],
    );
  }

  updateRowClasses(rowIdx: string, classes: Record<string, boolean>) {
    this.setRowClasses(rowIdx, { ...this.rowClasses[rowIdx], ...classes });
  }

  setRowClasses(rowIdx: string, classes: Record<string, boolean>) {
    this.rowClasses[rowIdx] = classes;
  }

  disableFeatureAt(
    location: TableFeatureLocation,
    feature: TableFeatureComponent,
    isDisabled: boolean,
  ) {
    this.featuresDisabled[location].set(feature, isDisabled);
    this.cdr.detectChanges();
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
    this.dataConfiguratorService.update({ size, page: 1 });
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
