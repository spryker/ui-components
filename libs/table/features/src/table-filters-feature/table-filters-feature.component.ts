import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
} from '@angular/core';
import { TableFeatureComponent, TableFeatureConfig, TableFeatureLocation } from '@spryker/table';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pluck,
  startWith,
  tap,
  shareReplay,
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
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: forwardRef(() => TableFiltersFeatureComponent),
    },
  ],
})
export class TableFiltersFeatureComponent extends TableFeatureComponent<TableFiltersConfig> {
  name = 'filters';
  tableFeatureLocation = TableFeatureLocation;
  styles = {
    flexGrow: '1',
    flexShrink: '0',
  };

  updateFiltersValue$ = new Subject<Record<string, unknown> | null>();
  filterComponentMap: Record<
    string,
    TableFilterComponent<TableFilterBase>
  > = this.tableFilterToken.reduce(
    (acc, filter) => ({ ...acc, ...filter }),
    {},
  ) as Record<string, TableFilterComponent<TableFilterBase>>;

  filters$ = this.config$.pipe(pluck('items'));

  filterValues$: Observable<Record<string, unknown>> = combineLatest([
    this.dataConfiguratorService$?.pipe(pluck('config', 'filter')) as Observable<
      Record<string, unknown>
    >,
    this.updateFiltersValue$.pipe(startWith(null)),
  ]).pipe(
    tap(([filterValues, updatedValue]) => {
      if (!updatedValue) {
        return;
      }

      const filters = {
        filter: { ...filterValues, ...updatedValue },
      };

      this.updateFiltersValue$.next(null);
      this.dataConfiguratorService?.update(filters);
    }),
    map(([filterValues]) => filterValues),
    distinctUntilChanged(),
    shareReplay({ refCount: true, bufferSize: 1 }),
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
