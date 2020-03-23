import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  forwardRef,
  OnInit,
} from '@angular/core';
import { TABLE_FILTERS_TOKEN } from './table-filters-feature.module';
import {
  TableFilterBase,
  TableFilterComponent,
  TableFiltersDeclaration,
} from './table-filters-feature';
import {
  TableComponent,
  TableDataConfiguratorService,
  TableFeatureComponent,
} from '@spryker/table';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pluck,
  startWith,
  tap,
} from 'rxjs/operators';

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
  filterComponentMap?: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$?: Observable<TableFilterBase[]>;
  filterValues$?: Observable<Record<string, unknown>>;

  updateFiltersValue$ = new Subject<Record<string, unknown> | null>();

  constructor(
    @Inject(forwardRef(() => TABLE_FILTERS_TOKEN))
    private tableFilterToken: TableFiltersDeclaration[],
    private tableComponent: TableComponent,
    public dataConfiguratorService: TableDataConfiguratorService,
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

    this.filters$ = this.tableComponent.config$.pipe(pluck('filters'));

    this.filterValues$ = combineLatest([
      this.dataConfiguratorService.config$.pipe(pluck('filter')) as Observable<
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
        this.dataConfiguratorService.update(filters);
      }),
      map(([filterValues]) => filterValues),
      distinctUntilChanged(),
    );
  }

  updateFilterValue(type: string, value: unknown): void {
    this.updateFiltersValue$.next({ [type]: value });
  }

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
