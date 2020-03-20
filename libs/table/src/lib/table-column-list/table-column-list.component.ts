import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Injectable,
  Input,
  OnInit,
} from '@angular/core';
import {
  TableColumnComponent,
  TableColumn,
  TableColumnContext,
  TableColumnTypeDef,
  TableColumnListConfig as ListConfig
} from '../table/table';
import {
  ColumnTypeOption,
  TableColumnTypeComponent,
} from '../column-type'

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
  implements TableColumnComponent<TableColumnListConfig>, OnInit {
  @Input() config?: TableColumnListConfig;
  @Input() context?: TableColumnContext;

  values: unknown[] = [];
  valuesLimited: unknown[] = [];
  configs: TableColumn[] = [];

  ngOnInit(): void {
    this.updateValues();
    this.updateConfigs();
  }

  private updateValues(): void {
    if (!this.context) {
      return;
    }

    const value = this.context.value;

    if (Array.isArray(value)) {
      this.values = value;
      this.valuesLimited = value.slice(0, this.config?.limit);
    } else {
      this.values = [value];
      this.valuesLimited = [value];
    }
  }

  private updateConfigs(): void {
    this.configs = this.values.map(() => {
      let config = {...this.context?.config};

      delete (config as TableColumnTypeDef).type;
      delete (config as TableColumnTypeDef).typeOptions;
      delete (config as TableColumnTypeDef).children;

      config = {...config, ...this.config};

      delete (config as ListConfig).limit;

      return config as TableColumn;
    });
  }
}
