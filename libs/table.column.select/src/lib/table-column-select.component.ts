import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Injectable,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnTypeOption,
  TableColumnContext,
  TableColumnComponent,
  TableColumnTypeComponent,
  ColumnTypeOptionsType,
} from '@spryker/table';
import { SelectOption, SelectValue } from '@spryker/select';
import { TableEditableService } from '@spryker/table.feature.editable';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    input: TableColumnSelectConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class ColumnSelectOptionItem {
  @ColumnTypeOption({ required: true })
  title = '';
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Number],
  })
  value?: SelectValue;
  @ColumnTypeOption()
  isDisabled? = false;
}

@Injectable({ providedIn: 'root' })
export class TableColumnSelectConfig {
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Number, ColumnSelectOptionItem],
  })
  options: (SelectOption | ColumnSelectOptionItem)[] = [];
  @ColumnTypeOption()
  multiple? = false;
  @ColumnTypeOption()
  search? = false;
  @ColumnTypeOption()
  disableClear? = false;
  @ColumnTypeOption()
  placeholder?: string;
  @ColumnTypeOption()
  showSelectAll? = false;
  @ColumnTypeOption()
  selectAllTitle?: string;
  @ColumnTypeOption()
  noOptionsText?: string;
}

@Component({
  selector: 'spy-table-column-select',
  templateUrl: './table-column-select.component.html',
  styleUrls: ['./table-column-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableEditableService]
})
@TableColumnTypeComponent(TableColumnSelectConfig)
export class TableColumnSelectComponent
  implements TableColumnComponent<TableColumnSelectConfig> {
  @Input() config?: TableColumnSelectConfig;
  @Input() context?: TableColumnContext;

  constructor(tableEditableService: TableEditableService) {}

  valueChangeHandler(value: any, configa?: any) {
    console.log(value, configa);
  }
}
