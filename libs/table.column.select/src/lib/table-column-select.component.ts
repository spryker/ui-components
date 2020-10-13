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
import {
  TableEditableColumn,
  TableEditableService,
} from '@spryker/table.feature.editable';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    select: TableColumnSelectConfig;
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
    value: [
      { type: ColumnTypeOptionsType.ArrayOf, value: String },
      {
        type: ColumnTypeOptionsType.ArrayOf,
        value: Number,
      },
      {
        type: ColumnTypeOptionsType.ArrayOf,
        value: ColumnSelectOptionItem,
      },
    ],
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
  @ColumnTypeOption()
  editableError?: string;
}

@Component({
  selector: 'spy-table-column-select',
  templateUrl: './table-column-select.component.html',
  styleUrls: ['./table-column-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableEditableService],
  host: {
    class: 'spy-table-column-select',
  },
})
@TableColumnTypeComponent(TableColumnSelectConfig)
export class TableColumnSelectComponent
  implements TableColumnComponent<TableColumnSelectConfig> {
  @Input() config?: TableColumnSelectConfig;
  @Input() context?: TableColumnContext;

  constructor(private tableEditableService: TableEditableService) {}

  valueChangeHandler(inputValue: string) {
    // tslint:disable-next-line: no-non-null-assertion
    this.context!.value = inputValue;
    // tslint:disable-next-line: no-non-null-assertion
    this.tableEditableService.updateValue(inputValue, this.context!.config);
  }
}