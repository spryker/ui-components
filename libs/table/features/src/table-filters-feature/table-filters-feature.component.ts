import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  forwardRef, ChangeDetectorRef, OnInit,
} from '@angular/core';
import { TABLE_FILTERS_TOKEN } from './table-filters-feature.module';
import {
  TableFilterBase,
  TableFilterComponent,
  TableFiltersDeclaration,
  TableFiltersToken,
} from './table-filters-feature';
import {
  TableComponent, TableDataConfig,
  TableDataConfiguratorService,
  TableFeatureComponent,
} from '@spryker/table';
import { Observable, Subject } from 'rxjs';
import { last, pluck, tap } from 'rxjs/operators';

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
export class TableFiltersFeatureComponent extends TableFeatureComponent implements OnInit {
  filterComponentMap?: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$?: Observable<TableFilterBase[]>;
  filterValues$?: Observable<Record<string, unknown>>;

  private updateFilterValue$ = new Subject<any>();

  constructor(
    private cdr: ChangeDetectorRef,

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

    this.filters$ = this.tableComponent.config$.pipe(
      pluck('filters', 'items'),
    );

    this.filterValues$ = this.dataConfiguratorService.config$.pipe(
      pluck('filter'),
    ) as Observable<Record<string, unknown>>;
  }

  updateFilterValue(type: string, value: unknown): void {
    this.filterValues$?.subscribe(filterValues => {
      const filters = { filter: { ...filterValues, [type]: value } };

      this.dataConfiguratorService.update(filters);
    });
  }

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
