import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  TableComponent,
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
  // tslint:disable-next-line: no-empty-interface
  interface TableConfig extends TableFiltersConfig {}
}

export interface TableFiltersConfig {
  filters?: {
    enabled: boolean;
    items: TableFilterBase[];
  };
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
  tableFeatureLocation = TableFeatureLocation;

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
    injector: Injector,
  ) {
    super(injector);
  }

  setTableComponent(table: TableComponent) {
    super.setTableComponent(table);

    this.updateFilters(table);
  }

  updateFilters(table: TableComponent): void {
    this.filterComponentMap = this.tableFilterToken.reduce(
      (acc, filter) => ({ ...acc, ...filter }),
      {},
    ) as Record<string, TableFilterComponent<TableFilterBase>>;

    this.filters$ = table.config$.pipe(pluck('filters', 'items'));

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
