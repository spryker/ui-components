import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Injectable,
  OnChanges,
  Input,
} from '@angular/core';
import {
  TableColumnComponent,
  TableColumnTypeComponent,
  TableColumnType,
  TableColumnTypeOptions,
  ColumnTypeOption,
  ColumnTypeOptionsType,
  TableColumnContext,
  TableColumn,
  TableDataRow,
} from '@spryker/table';
import { ContextService, TypedSimpleChanges } from '@spryker/utils';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    dynamic: TableColumnDynamicConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnDynamicConfig {
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.TypeOf,
    value: String,
  })
  type!: TableColumnType;
  @ColumnTypeOption()
  typeOptions?: TableColumnTypeOptions;
}

@Component({
  selector: 'spy-table-column-dynamic',
  templateUrl: './table-column-dynamic.component.html',
  styleUrls: ['./table-column-dynamic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnDynamicConfig)
export class TableColumnDynamicComponent
  implements TableColumnComponent<TableColumnDynamicConfig>, OnChanges {
  @Input() config?: TableColumnDynamicConfig;
  @Input() context?: TableColumnContext;

  colConfig?: TableColumn;
  colData?: TableDataRow;

  private colKey = 'dynamic';

  constructor(private contextService: ContextService) {}

  ngOnChanges(changes: TypedSimpleChanges<TableColumnComponent>): void {
    if (changes.config || changes.context) {
      this.updateConfig();
    }

    if (changes.context) {
      this.updateData();
    }
  }

  private updateConfig() {
    if (!this.config || !this.context) {
      this.colConfig = undefined;
      return;
    }

    const config = { ...this.config, id: this.colKey, title: this.colKey };
    this.colConfig = this.interpolateConfigReq(config, this.context);
  }

  private updateData() {
    this.colData = { [this.colKey]: this.context?.value };
  }

  private interpolateConfigReq<T>(config: T, context: any): T {
    switch (typeof config) {
      case 'string':
        return this.contextService.interpolateObj(config, context) as any;
      case 'object':
        return Array.isArray(config)
          ? (config.map((value) =>
              this.interpolateConfigReq(value, context),
            ) as any)
          : Object.entries(config).reduce(
              (acc, [key, value]) => ({
                ...acc,
                [key]: this.interpolateConfigReq(value, context),
              }),
              {} as T,
            );
      default:
        return config;
    }
  }
}
