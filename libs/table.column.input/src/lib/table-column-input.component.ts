import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Injectable,
  ViewEncapsulation,
} from '@angular/core';
import { TableEditableService } from '@spryker/table.feature.editable';
import {
  ColumnTypeOption,
  TableColumnContext,
  TableColumnComponent,
  TableColumnTypeComponent,
} from '@spryker/table';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    input: TableColumnInputConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnInputConfig {
  @ColumnTypeOption()
  type?: string;
  @ColumnTypeOption()
  placeholder?: string;
  @ColumnTypeOption()
  prefix?: string;
  @ColumnTypeOption()
  suffix?: string;
  @ColumnTypeOption()
  outerPrefix?: string;
  @ColumnTypeOption()
  outerSuffix?: string;
}

@Component({
  selector: 'spy-table-column-input',
  templateUrl: './table-column-input.component.html',
  styleUrls: ['./table-column-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableEditableService]
})
@TableColumnTypeComponent(TableColumnInputConfig)
export class TableColumnInputComponent
  implements TableColumnComponent<TableColumnInputConfig> {
  @Input() config?: TableColumnInputConfig;
  @Input() context?: TableColumnContext;

  constructor(tableEditableService: TableEditableService) {}

  valueChangeHandler(value: any, configa?: any) {
    console.log(value, configa);
  }
}
