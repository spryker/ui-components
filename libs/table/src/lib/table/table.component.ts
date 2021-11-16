import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Injector,
  Input,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ToJson } from '@spryker/utils';
import {
  combineLatest,
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  pairwise,
  pluck,
  shareReplay,
  skip,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { TableActionsService } from '../table-actions/table-actions.service';
import { TableConfigService } from '../table-config/table-config.service';
import { TableFeatureConfig } from '../table-config/types';
import { TableFeatureLoaderService } from '../table-feature-loader/table-feature-loader.service';
import { TableFeatureEventBus } from '../table-feature/table-feature-event-bus';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableFeatureDirective } from '../table-feature/table-feature.directive';
import { TableFeaturesRendererService } from '../table-features-renderer/table-features-renderer.service';
import { ColTplDirective } from './col-tpl.directive';
import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import { TableDatasourceService } from './datasource.service';
import {
  SortingCriteria,
  TableColumn,
  TableColumnContext,
  TableColumnTplContext,
  TableComponent,
  TableConfig,
  TableDataConfig,
  TableDataRow,
  TableEvents,
  TableFeatureLocation,
  TableHeaderContext,
  TableRowClickEvent,
} from './table';
import { TableEventBus } from './table-event-bus';
import { InternalTableLocatorService } from '../table-locator';

const shareReplaySafe: <T>() => MonoTypeOperatorFunction<T> = () =>
  shareReplay({ bufferSize: 1, refCount: true });

@Component({
  selector: 'spy-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    TableDataConfiguratorService,
    TableColumnsResolverService,
    TableFeaturesRendererService,
    TableActionsService,
    TableDatasourceService,
  ],
  host: {
    class: 'spy-table',
  },
})
export class CoreTableComponent
  implements TableComponent, OnInit, OnChanges, AfterContentInit, OnDestroy
{
  static Count = 0;

  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;
  /**
   * {
   *    selectable: () => ...,
   *    'selectable:bla': () => ...,
   * }
   */
  @Input() events: TableEvents = {};

  @ViewChild('cellTpl', { static: true })
  cellTpl!: TemplateRef<TableColumnContext>;

  @ViewChild('headerTpl', { static: true })
  headerTpl!: TemplateRef<TableHeaderContext>;
  @ViewChild('tableElementRef', { read: ElementRef })
  tableElementRef!: ElementRef<HTMLElement>;

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
  featureDirectives?: QueryList<TableFeatureDirective>;

  featureLocation = TableFeatureLocation;
  featureComponentType = TableFeatureComponent;

  private setConfig$ = new ReplaySubject<TableConfig>(1);
  config$ = this.setConfig$.pipe(shareReplaySafe());

  error$ = new Subject<unknown>();

  columnsConfig$ = this.config$.pipe(
    map((config) => config.columns || config.columnsUrl),
    distinctUntilChanged(),
    shareReplaySafe(),
  );

  columns$ = this.columnsConfig$.pipe(
    switchMap((colsOrUrl) =>
      colsOrUrl
        ? this.columnsResolverService
            .resolve(colsOrUrl)
            .pipe(catchError(this.handleStreamError()))
        : of([]),
    ),
    shareReplaySafe(),
  );
  private isEmpty = true;

  data$ = this.config$.pipe(
    map((config) => config.dataSource),
    distinctUntilChanged(),
    switchMap((dataSource) => this.datasourceService.resolve(dataSource)),
    shareReplaySafe(),
  );
  tableData$ = this.data$.pipe(pluck('data'));
  sortingData$ = this.dataConfiguratorService.config$.pipe(
    map((config) => {
      const sortBy = config.sortBy;
      let direction = config.sortDirection;

      if (sortBy && direction) {
        direction = direction === 'asc' ? 'ascend' : 'descend';
      }

      return { sortDirection: direction, sortBy: sortBy };
    }),
  );

  featureFactories$ = this.config$.pipe(
    switchMap((config) => this.featureLoaderService.loadFactoriesFor(config)),
  );

  featureRefs$ = this.featureFactories$.pipe(
    map((featureFactories) =>
      Object.entries(featureFactories).map(([name, featureFactory]) => {
        const featureRef = featureFactory.create(this.vcr.injector);

        // Init feature name component
        featureRef.instance.name = name;

        // Add feature to the view CD
        this.vcr.insert(featureRef.hostView);

        featureRef.changeDetectorRef.detectChanges();

        return featureRef;
      }),
    ),
    shareReplaySafe(),
  );

  configFeatures$ = this.featureRefs$.pipe(
    map((featureRefs) => featureRefs.map((featureRef) => featureRef.instance)),
    startWith([]),
    shareReplaySafe(),
  );

  projectedFeatures$ = new ReplaySubject<TableFeatureComponent[]>();
  private projectedFeaturesEmitted = false;

  features$ = combineLatest([
    this.configFeatures$,
    this.projectedFeatures$.pipe(startWith([])),
  ]).pipe(
    map((allFeatures) => allFeatures.flat()),
    tap((features) => features.forEach((feature) => this.initFeature(feature))),
    shareReplaySafe(),
  );

  private featuresLoaded$ = this.features$.pipe(delay(0), skip(1), take(1));

  featureHeaderContext$ =
    this.tableFeaturesRendererService.chainFeatureContexts(
      this.features$,
      TableFeatureLocation.header,
      () => this.headerTpl,
      (config: TableColumn, i: number): TableHeaderContext => ({ config, i }),
    );

  featureCellContext$ = this.tableFeaturesRendererService.chainFeatureContexts(
    this.features$,
    TableFeatureLocation.cell,
    () => this.cellTpl,
    (
      config: TableColumn,
      row: TableDataRow,
      i: number,
      j: number,
    ): TableColumnContext => ({ config, row, i, j, value: row[config.id] }),
  );

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  featuresInRows$ = this.features$.pipe(
    switchMap((features) =>
      combineLatest([
        this.tableFeaturesRendererService.trackFeatureRecords(
          features,
          TableFeatureLocation.beforeRows,
        ),
        this.tableFeaturesRendererService.trackFeatureRecords(
          features,
          TableFeatureLocation.afterRows,
        ),
      ]),
    ),
    map((features) => features.flat()),
    startWith([]),
    shareReplaySafe(),
  );

  isEmpty$ = combineLatest([
    this.tableData$.pipe(map((data) => Boolean(data.length))),
    this.dataConfiguratorService.config$.pipe(
      map((config) => Boolean(Object.keys(config).length)),
    ),
    this.featuresInRows$.pipe(map((features) => Boolean(features.length))),
  ]).pipe(
    startWith([true, false, true]),
    map(([isTableData, isConfig, isFeaturesInRows]) => {
      this.isEmpty = !isTableData;
      return !isTableData && !isFeaturesInRows && isConfig;
    }),
    shareReplaySafe(),
  );

  isNotFiltered$ = this.dataConfiguratorService.config$.pipe(
    startWith({}),
    pairwise(),
    map(([prevConfig, newConfig]) => {
      const isFiltered = (config: Record<string, unknown>) =>
        config.filter
          ? Boolean(
              Object.keys(config.filter as Record<string, unknown>).length,
            )
          : false;
      const isSearched = (config: Record<string, unknown>) =>
        config.search ? String(config.search).length : false;
      const isChanged =
        isFiltered(prevConfig) ||
        isSearched(prevConfig) ||
        isFiltered(newConfig) ||
        isSearched(newConfig);

      return !isChanged;
    }),
    shareReplaySafe(),
  );

  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  features: TableFeatureComponent[] = [];
  rowClasses: Record<string, Record<string, boolean>> = {};

  private destroyed$ = new Subject<void>();

  private count = CoreTableComponent.Count++;
  private setTableId$ = new ReplaySubject<string>();
  tableId$ = this.setTableId$.pipe(
    startWith(undefined),
    map((tableId) => {
      if (!tableId) {
        tableId = `tableId-${this.count}`;
      }

      return tableId;
    }),
    shareReplay({ bufferSize: 1, refCount: false }),
  );

  private featuresDiffer = this.iterableDiffers
    .find([])
    .create<TableFeatureComponent>();

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
    private vcr: ViewContainerRef,
    private iterableDiffers: IterableDiffers,
    private dataConfiguratorService: TableDataConfiguratorService,
    private columnsResolverService: TableColumnsResolverService,
    private tableActionsService: TableActionsService,
    private featureLoaderService: TableFeatureLoaderService,
    private configService: TableConfigService,
    private datasourceService: TableDatasourceService,
    private tableFeaturesRendererService: TableFeaturesRendererService,
    private internalTableLocatorService: InternalTableLocatorService,
    public injector: Injector,
    @Optional()
    @SkipSelf()
    public parentTable: CoreTableComponent,
  ) {}

  ngOnInit(): void {
    this.featuresLoaded$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.dataConfiguratorService.triggerInitialData());
    this.tableId$
      .pipe(
        switchMap(() => this.internalTableLocatorService.register(this)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
    this.tableActionsService._setEventBus(this.tableEventBus);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.config = this.configService.normalize(this.config);
      this.setConfig$.next(this.config);
    }

    if (changes.tableId && this.tableId) {
      this.setTableId$.next(this.tableId);
    }
  }

  ngAfterContentInit(): void {
    if (!this.featureDirectives) {
      return;
    }

    this.featureDirectives.changes
      .pipe(
        startWith(null),
        // featureDirectives were already checked above
        // tslint:disable-next-line: no-non-null-assertion
        map(() => this.featureDirectives!.map((feature) => feature.component)),
        takeUntil(this.destroyed$),
      )
      .subscribe((features) => this.updateFeatures(features));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  on(feature: string, eventName?: string) {
    return this.tableEventBus.on(feature, eventName);
  }

  findFeatureByName(name: string): Observable<TableFeatureComponent> {
    return this.features$.pipe(
      map((features) => features.find((feature) => feature.name === name)),
      filter((feature) => feature !== undefined),
    ) as Observable<TableFeatureComponent>;
  }

  findFeatureByType<T extends TableFeatureComponent>(
    type: Type<T>,
  ): Observable<T> {
    return this.features$.pipe(
      map((features) => features.find((feature) => feature instanceof type)),
      filter((feature) => feature !== undefined),
    ) as Observable<T>;
  }

  updateRowClasses(rowIdx: string, classes: Record<string, boolean>): void {
    this.setRowClasses(rowIdx, { ...this.rowClasses[rowIdx], ...classes });
  }

  setRowClasses(rowIdx: string, classes: Record<string, boolean>): void {
    this.rowClasses[rowIdx] = classes;
    this.cdr.markForCheck();
  }

  /** @internal */
  updateFeatures(features: TableFeatureComponent[]): void {
    if (!this.featuresDiffer.diff(features) && this.projectedFeaturesEmitted) {
      return;
    }

    this.projectedFeaturesEmitted = true;
    this.projectedFeatures$.next(features);
  }

  rowClickHandler(row: TableDataRow, event: Event): void {
    this.tableEventBus.emit<TableRowClickEvent>(
      'table',
      { row, event },
      'row-click',
    );
  }

  /** @internal */
  updateSorting(event: {
    key: string;
    value: 'descend' | 'ascend' | null;
  }): void {
    if (this.isEmpty) {
      return;
    }
    const { key, value } = event;
    const sortingCriteria: SortingCriteria = {
      sortBy: value ? key : undefined,
      sortDirection: this.sortingValueTransformation(value),
    };

    this.dataConfiguratorService.update(sortingCriteria as TableDataConfig);
  }

  /** @internal */
  trackByColumns(index: number, item: TableColumn): string {
    return item.id;
  }

  /** @internal */
  trackByData(index: number, data: TableDataRow): number {
    return index;
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

  private initFeature(feature: TableFeatureComponent): void {
    // FIXME: features init double time
    feature.setConfig(this.config?.[feature.name] as TableFeatureConfig);
    feature.setTableComponent(this);
    feature.setTableEventBus(
      new TableFeatureEventBus(feature.name, this.tableEventBus),
    );
    feature.setColumnsResolverService(this.columnsResolverService);
    feature.setDataSourceService(this.datasourceService);
    feature.setDataConfiguratorService(this.dataConfiguratorService);
    feature.setActionsService(this.tableActionsService);
  }
}
