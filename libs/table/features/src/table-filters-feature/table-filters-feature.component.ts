import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  TableComponent,
  TableDataConfiguratorService,
  TableFeatureComponent,
  TableFeatureLocation,
} from '@spryker/table';
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
    filters?: TableFilterBase[];
  }
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
export class TableFiltersFeatureComponent extends TableFeatureComponent
  implements OnInit {
  name = 'filters';

  @Input() location = TableFeatureLocation.top;
  @Input() styles = {
    flexGrow: '1',
  };

  filterComponentMap?: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$?: Observable<TableFilterBase[]>;
  filterValues$?: Observable<Record<string, unknown>>;

  updateFiltersValue$ = new Subject<Record<string, unknown> | null>();

  constructor(
    @Inject(TABLE_FILTERS_TOKEN)
    private tableFilterToken: TableFiltersDeclaration[],
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateFilters();
  }

  updateFilters(): void {
    this.filterComponentMap = this.tableFilterToken.reduce(
      (acc, filter) => ({ ...acc, ...filter }),
      {},
    ) as Record<string, TableFilterComponent<TableFilterBase>>;

    this.filters$ = this.table?.config$.pipe(pluck('filters'));

    this.filterValues$ = combineLatest([
      this.dataConfiguratorService?.config$.pipe(pluck('filter')) as Observable<
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
  }

  updateFilterValue(id: string, value: unknown): void {
    this.updateFiltersValue$.next({ [id]: value });
  }

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
