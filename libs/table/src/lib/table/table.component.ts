import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { DropdownItem } from '@spryker/dropdown';
import { ToJson } from '@spryker/utils';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  merge,
  MonoTypeOperatorFunction,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mapTo,
  pairwise,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { TableActionsService } from '../table-actions/table-actions.service';
import { TableConfigService } from '../table-config/table-config.service';
import { TableFeatureConfig } from '../table-config/types';
import { TableFeatureLoaderService } from '../table-feature-loader/table-feature-loader.service';
import { TableFeatureEventBus } from '../table-feature/table-feature-event-bus';
import { TableFeatureTplContext } from '../table-feature/table-feature-tpl.directive';
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
  TableFeatureLocation,
  TableRowClickEvent,
  TableHeaderContext,
} from './table';
import { TableEventBus } from './table-event-bus';

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
    TableDatasourceService,
    TableActionsService,
  ],
  host: {
    class: 'spy-table',
  },
})
export class CoreTableComponent
  implements TableComponent, OnInit, OnChanges, AfterContentInit, OnDestroy {
  static Count = 0;

  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;
  /**
   * {
   *    selectable: () => ...,
   *    'selectable:bla': () => ...,
   * }
   */
  @Input() events: Record<string, ((data: unknown) => void) | undefined> = {};

  @ViewChild('cellTpl', { static: true }) cellTpl!: TemplateRef<
    TableColumnContext
  >;

  @ViewChild('headerTpl', { static: true }) headerTpl!: TemplateRef<
    TableHeaderContext
  >;

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

  data$ = this.config$.pipe(
    map(config => config.dataSource),
    distinctUntilChanged(),
    switchMap(dataSource => this.datasourceService.resolve(dataSource)),
    shareReplaySafe(),
  );

  tableData$ = this.data$.pipe(pluck('data'));
  sortingData$ = this.dataConfiguratorService.config$.pipe(
    map(config => {
      const sortBy = config.sortBy;
      let direction = config.sortDirection;

      if (sortBy && direction) {
        direction = direction === 'asc' ? 'ascend' : 'descend';
      }

      return { sortDirection: direction, sortBy: sortBy };
    }),
  );

  featureFactories$ = this.config$.pipe(
    switchMap(config => this.featureLoaderService.loadFactoriesFor(config)),
  );

  featureRefs$ = this.featureFactories$.pipe(
    map(featureFactories =>
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
    map(featureRefs => featureRefs.map(featureRef => featureRef.instance)),
    startWith([]),
    shareReplaySafe(),
  );

  projectedFeatures$ = new BehaviorSubject<TableFeatureComponent[]>([]);

  features$ = combineLatest([
    this.configFeatures$,
    this.projectedFeatures$,
  ]).pipe(
    map(allFeatures => allFeatures.flat()),
    tap(features => features.forEach(feature => this.initFeature(feature))),
    shareReplaySafe(),
  );

  featureHeaderContext$ = this.tableFeaturesRendererService.chainFeatureContexts(
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
    ): TableColumnContext => ({ config, row, i, value: row[config.id] }),
  );

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  isEmpty$ = combineLatest([
    this.tableData$.pipe(map(data => Boolean(data.length))),
    this.dataConfiguratorService.config$.pipe(
      map(config => Boolean(Object.keys(config).length)),
    ),
  ]).pipe(
    startWith([true, false]),
    map(([isTableData, isConfig]) => !isTableData && isConfig),
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
  actions?: DropdownItem[];

  private destroyed$ = new Subject<void>();

  private count = CoreTableComponent.Count++;
  private setTableId$ = new ReplaySubject<string>();
  tableId$ = this.setTableId$.pipe(
    startWith(undefined),
    map(tableId => {
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
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.dataConfiguratorService.triggerInitialData(), 0);
    this.tableActionsService._setEventBus(this.tableEventBus);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.config = this.configService.normalize(this.config);
      this.setConfig$.next(this.config);
    }

    if (changes.tableId) {
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
        map(() => this.featureDirectives!.map(feature => feature.component)),
        takeUntil(this.destroyed$),
      )
      .subscribe(features => this.updateFeatures(features));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
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
    if (!this.featuresDiffer.diff(features)) {
      return;
    }

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
