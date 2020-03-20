import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  forwardRef, ChangeDetectorRef, AfterViewInit,
} from '@angular/core';
import { TABLE_FILTERS_TOKEN } from './table-filters-feature.module';
import {
  TableFilterBase,
  TableFilterComponent,
  TableFiltersDeclaration,
  TableFiltersToken,
} from './table-filters-feature';
import {
  TableComponent,
  TableDataConfiguratorService,
  TableFeatureComponent,
} from '@spryker/table';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

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
  implements AfterViewInit {
  filterComponentMap?: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$?: Observable<TableFilterBase[]>;
  filterValues$?: Observable<Record<string, unknown>>;

  constructor(
    private cdr: ChangeDetectorRef,

    @Inject(forwardRef(() => TABLE_FILTERS_TOKEN))
    private tableFilterToken: TableFiltersToken,
    private tableComponent: TableComponent,
    public dataConfiguratorService: TableDataConfiguratorService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.filterComponentMap = ((this
        .tableFilterToken as unknown) as TableFiltersDeclaration[]).reduce(
        (acc: any, filter: any) => {
          return { ...acc, ...filter };
        },
        {},
      );

      this.filters$ = this.tableComponent.config$.pipe(
        pluck('filters'),
        pluck('items'),
      );

      this.filterValues$ = this.dataConfiguratorService.config$.pipe(
        pluck('filter'),
      ) as Observable<Record<string, unknown>>;

      this.cdr.detectChanges();
    });
  }

  updateFilterValue(type: string, value: unknown): void {}

  trackByFilter(index: number, filter: TableFilterBase): string {
    return filter.type;
  }
}
