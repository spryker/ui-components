import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Injectable,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  TableColumnComponent,
  TableColumn,
  TableColumnContext,
  TableColumnTypeDef,
} from '../table/table';
import { ColumnTypeOption, TableColumnTypeComponent } from '../column-type';

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
export class TableColumnListComponent
  implements TableColumnComponent<TableColumnListConfig>, OnInit, OnChanges {
  @Input() config?: TableColumnListConfig;
  @Input() context?: TableColumnContext;

  values: unknown[] = [];
  valuesLimited: unknown[] = [];
  configs: TableColumn[] = [];

  ngOnInit(): void {
    this.updateValues();
    this.updateConfigs();
  }

  ngOnChanges(): void {
    this.updateValues();
    this.updateConfigs();
  }

  private updateValues(): void {
    if (!this.context) {
      return;
    }

    const value = this.context.value;
    const values = Array.isArray(value) ? value : [value];
    this.values = values.map(_value => ({
      // tslint:disable-next-line: no-non-null-assertion
      ...this.context!.row,
      // tslint:disable-next-line: no-non-null-assertion
      [this.context!.config.id]: _value,
    }));
    this.valuesLimited = Array.isArray(value)
      ? this.values.slice(0, this.config?.limit)
      : [...this.values];
  }

  private updateConfigs(): void {
    this.configs = this.values.map(() => {
      const config = { ...this.context?.config };

      delete (config as TableColumnTypeDef).type;
      delete (config as TableColumnTypeDef).typeOptions;
      delete (config as TableColumnTypeDef).children;

      Object.assign(config, this.config);

      delete (config as TableColumnListConfig).limit;

      return config as TableColumn;
    });
  }
}
