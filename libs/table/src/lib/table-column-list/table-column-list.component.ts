import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable, Input, OnInit } from '@angular/core';
import {
  ColumnTypeOption,
  TableColumnTypeComponent,
  TableColumnComponent,
  TableColumn, TableColumnContext,
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
export class TableColumnListComponent implements TableColumnComponent<TableColumnListConfig>, OnInit {
  @Input() config?: TableColumnListConfig;
  @Input() context?: TableColumnContext;

  values: unknown[] = [];
  valuesLimited: unknown[] = [];
  configs: TableColumn[] = [];

  ngOnInit(): void {
    this.updateValues();
    this.configs = this.updateConfigs();
  }

  private updateValues() {
    if (!this.context) {
      return;
    }

    const value = this.context.value;

    if (Array.isArray(value)) {
      this.values = value;
      this.valuesLimited = value.slice(0, this.config?.limit);

      return;
    }

    this.values = [value];
    this.valuesLimited = [value];
  }

  private updateConfigs(): any {
    return this.values.map(value => {
      // const config = {...this.context?.config};

    });
  }
}
