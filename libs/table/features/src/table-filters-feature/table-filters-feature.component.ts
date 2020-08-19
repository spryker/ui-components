import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  ViewEncapsulation,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableFeatureConfig,
  TableFeatureLocation,
} from '@spryker/table';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pluck,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';

import { TABLE_FILTERS_TOKEN } from './tokens';
import {
  TableFilterBase,
  TableFilterComponent,
  TableFiltersDeclaration,
} from './types';

declare module '@spryker/table' {
  interface TableConfig {
    filters?: TableFiltersConfig;
  }
}

export interface TableFiltersConfig extends TableFeatureConfig {
  items: TableFilterBase[];
}

@Component({
  selector: 'spy-table-filters-feature',
  templateUrl: './table-filters-feature.component.html',
  styleUrls: ['./table-filters-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: forwardRef(() => TableFiltersFeatureComponent),
    },
  ],
})
export class TableFiltersFeatureComponent extends TableFeatureComponent<
  TableFiltersConfig
> {
  name = 'filters';
  tableFeatureLocation = TableFeatureLocation;

  updateFiltersValue$ = new Subject<Record<string, unknown> | null>();
  filterComponentMap: Record<
    string,
    TableFilterComponent<TableFilterBase>
  > = this.tableFilterToken.reduce(
    (acc, filter) => ({ ...acc, ...filter }),
    {},
  ) as Record<string, TableFilterComponent<TableFilterBase>>;
  dataConfig$ = this.dataConfiguratorService$.pipe(
    switchMap(service => service.config$),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  filters$ = this.config$.pipe(pluck('items'));
  filterValues$: Observable<Record<string, unknown>> = combineLatest([
    this.dataConfig$.pipe(pluck('filter')) as Observable<
      Record<string, unknown>
    >,
    this.updateFiltersValue$.pipe(startWith(null)),
  ]).pipe(
    map(([filterValues, updatedValue]) => {
      const filter = { ...filterValues, ...updatedValue };
      const filters = { filter };

      if (updatedValue) {
        this.updateFiltersValue$.next(null);
        this.dataConfiguratorService?.update(filters);
      }

      return filter;
    }),
    distinctUntilChanged(),
    shareReplay({ refCount: true, bufferSize: 1 }),
  );
  data$ = this.table$.pipe(
    switchMap(table => table.data$),
    pluck('data'),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  isVisible$ = combineLatest([
    this.dataConfig$,
    this.data$,
    this.table$.pipe(switchMap(table => table.isLoading$)),
  ]).pipe(
    map(([config, data, isLoading]) => {
      const isFiltered = config?.filter
        ? Boolean(Object.keys(config.filter as Record<string, unknown>).length)
        : false;
      const isSearched = config?.search
        ? (config.search as string).length
        : false;
      const isChanged = isFiltered || isSearched;
      const isData = Boolean(data.length);

      return isData || (!isData && (isChanged || isLoading));
    }),
  );

  constructor(
    @Inject(TABLE_FILTERS_TOKEN)
    private tableFilterToken: TableFiltersDeclaration[],
    injector: Injector,
  ) {
    super(injector);
  }

  updateFilterValue(id: string, value: unknown): void {
    this.updateFiltersValue$.next({ [id]: value });
  }

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
