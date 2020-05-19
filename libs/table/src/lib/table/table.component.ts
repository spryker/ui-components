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
  distinctUntilChanged,
  map,
  mapTo,
  pluck,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { TableFeatureConfig } from '../table-config/types';
import { TableFeatureLoaderService } from '../table-feature-loader/table-feature-loader.service';
import { TableFeatureEventBus } from '../table-feature/table-feature-event-bus';
import { TableFeatureComponent } from '../table-feature/table-feature.component';
import { TableFeatureDirective } from '../table-feature/table-feature.directive';
import { TableFeaturesRendererService } from '../table-features-renderer/table-features-renderer.service';
import { TableActionService } from './action.service';
import { ColTplDirective } from './col-tpl.directive';
import { TableColumnsResolverService } from './columns-resolver.service';
import { TableDataConfiguratorService } from './data-configurator.service';
import {
  SortingCriteria,
  TableColumn,
  TableColumnTplContext,
  TableComponent,
  TableConfig,
  TableDataConfig,
  TableDataRow,
  TableFeatureLocation,
} from './table';
import { TableEventBus } from './table-event-bus';
import { TableConfigService } from '../table-config/table-config.service';
import { TableDatasourceService } from './datasource.service';

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
    TableActionService,
    TableFeaturesRendererService,
    TableDatasourceService,
  ],
})
export class CoreTableComponent
  implements TableComponent, OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() @ToJson() config?: TableConfig;
  @Input() tableId?: string;
  /**
   * {
   *    selectable: () => ...,
   *    'selectable:bla': () => ...,
   * }
   */
  @Input() events: Record<string, ((data: unknown) => void) | undefined> = {};

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

  isLoading$ = merge(
    this.dataConfiguratorService.config$.pipe(mapTo(true)),
    this.data$.pipe(mapTo(false)),
    this.error$.pipe(mapTo(false)),
  ).pipe(startWith(false), shareReplaySafe());

  isEmpty$ = combineLatest([
    this.isLoading$,
    this.tableData$.pipe(map(data => Boolean(data.length))),
    this.dataConfiguratorService.config$.pipe(
      map(config => Boolean(Object.keys(config).length)),
    ),
  ]).pipe(
    startWith([true, true, false]),
    map((states: boolean[]) => {
      const [isLoading, isTableData, isConfig] = states;

      return !isLoading && !isTableData && isConfig;
    }),
    shareReplaySafe(),
  );

  isFiltered$ = this.dataConfiguratorService.config$.pipe(
    map(config => {
      const isFiltered = config.filter
        ? Boolean(Object.keys(config.filter as Record<string, unknown>).length)
        : false;
      const isSearched = config.search
        ? (config.search as string).length
        : false;

      return isFiltered || isSearched;
    }),
    shareReplaySafe(),
  );

  templatesObj: Record<string, TemplateRef<TableColumnTplContext>> = {};
  features: TableFeatureComponent[] = [];
  rowClasses: Record<string, Record<string, boolean>> = {};
  actions?: DropdownItem[];

  private destroyed$ = new Subject<void>();

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
    private tableActionService: TableActionService,
    private featureLoaderService: TableFeatureLoaderService,
    private configService: TableConfigService,
    private datasourceService: TableDatasourceService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => this.dataConfiguratorService.triggerInitialData(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.config = this.configService.normalize(this.config);
      this.setConfig$.next(this.config);
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

  getTableId(): string | undefined {
    return this.tableId;
  }

  /** @internal */
  updateFeatures(features: TableFeatureComponent[]): void {
    if (!this.featuresDiffer.diff(features)) {
      return;
    }

    this.projectedFeatures$.next(features);
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
  }
}
