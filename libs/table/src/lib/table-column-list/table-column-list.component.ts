import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable } from '@angular/core';
import {
  ColumnTypeOption,
  TableColumnTypeComponent,
  TableColumnTypeDef,
  TableColumn, TableColumnComponent,
} from '@spryker/table';

export class TableColumnListConfigInner {
  @ColumnTypeOption()
  type?: string;
  @ColumnTypeOption()
  typeOptions?: Object;
  @ColumnTypeOption()
  typeChildren?: TableColumnListConfigInner[];
}

@Injectable({ providedIn: 'root' })
export class TableColumnListConfig extends TableColumnListConfigInner {
  @ColumnTypeOption()
  limit = 2;
}

@Component({
  selector: 'spy-table-column-list',
  templateUrl: './table-column-list.component.html',
  styleUrls: ['./table-column-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnListConfig)
export class TableColumnListComponent implements TableColumnComponent<TableColumnListConfig> {
  values: unknown[] = [];
  valuesLimited: unknown[] = [];
  configs: TableColumn[] = [];
}
