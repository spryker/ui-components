import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { TABLE_FILTERS_TOKEN } from './table-filters-feature.module';
import { TableFiltersToken } from './table-filters';
import { TableComponent, TableDataConfiguratorService } from '@spryker/table';

@Component({
  selector: 'spy-table-filters-feature',
  templateUrl: './table-filters-feature.component.html',
  styleUrls: ['./table-filters-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFiltersFeatureComponent implements OnInit {
  constructor(
    @Inject(TABLE_FILTERS_TOKEN)
    private tableFilterToken: TableFiltersToken,
    private tableComponent: TableComponent,
    private dataConfiguratorService: TableDataConfiguratorService,
  ) {}

  ngOnInit(): void {}
}
