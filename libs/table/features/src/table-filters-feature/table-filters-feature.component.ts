import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  forwardRef
} from '@angular/core';
import { TABLE_FILTERS_TOKEN } from './table-filters-feature.module';
import { TableFilterBase, TableFilterComponent, TableFiltersToken } from './table-filters-feature';
import { TableComponent, TableDataConfiguratorService, TableFeatureComponent } from '@spryker/table';
import { Observable } from "rxjs";

@Component({
  selector: 'spy-table-filters-feature',
  templateUrl: './table-filters-feature.component.html',
  styleUrls: ['./table-filters-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: forwardRef(()=> TableFiltersFeatureComponent),
    },
  ]
})
export class TableFiltersFeatureComponent extends TableFeatureComponent implements OnInit {
  filterComponentMap?: Record<string, TableFilterComponent<TableFilterBase>>;
  filters$?: Observable<TableFilterBase[]>;
  filterValues$?: Observable<Record<string, unknown>>;

  constructor(
    @Inject(forwardRef(() => TABLE_FILTERS_TOKEN))
    private tableFilterToken: TableFiltersToken,
    private tableComponent: TableComponent,
    public dataConfiguratorService: TableDataConfiguratorService,
  ) {
    super();
    console.log(this.tableFilterToken);
  }

  updateFilterValue(type: string, value: unknown): void {

  }

  ngOnInit(): void {}
}
