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
  TableFiltersToken,
} from './types';
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

  updateFiltersValue$ = new Subject<any>();

  constructor(
    @Inject(forwardRef(() => TABLE_FILTERS_TOKEN))
    private tableFilterToken: TableFiltersToken,
    private tableComponent: TableComponent,
    public dataConfiguratorService: TableDataConfiguratorService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateFilters();
  }

  updateFilters(): void {
    this.filterComponentMap = ((this
      .tableFilterToken as unknown) as TableFiltersDeclaration[]).reduce(
      (acc: any, filter: any) => {
        return { ...acc, ...filter };
      },
      {},
    );

    this.filters$ = this.tableComponent.config$.pipe(pluck('filters', 'items'));

    this.filterValues$ = combineLatest([
      this.dataConfiguratorService.config$.pipe(pluck('filter')) as Observable<
        Record<string, unknown>
      >,
      this.updateFiltersValue$.pipe(startWith(null)),
    ]).pipe(
      tap(([filterValues, upValues]) => {
        if (!upValues) {
          return;
        }

        const filters = {
          filter: { ...filterValues, [upValues.type]: upValues.value },
        };

        this.updateFiltersValue$.next(null);
        this.dataConfiguratorService.update(filters);
      }),
      map(([filterValues]) => filterValues),
      distinctUntilChanged(),
    );
  }

  updateFilterValue(type: string, value: unknown): void {
    this.updateFiltersValue$.next({ type, value });
  }

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
