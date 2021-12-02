import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  DataTransformerConfig,
  DataTransformerType,
} from '@spryker/data-transformer';
import { DatasourceConfig, DatasourceType } from '@spryker/datasource';
import { SelectOption, SelectValue } from '@spryker/select';
import {
  ColumnTypeOption,
  ColumnTypeOptionsType,
  TableColumnComponent,
  TableColumnContext,
  TableColumnTypeComponent,
} from '@spryker/table';
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class ColumnSelectDataTransformer implements DataTransformerConfig {
  @ColumnTypeOption({ required: true })
  type!: DataTransformerType;
  [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnSelectDatasource implements DatasourceConfig {
  @ColumnTypeOption({ required: true })
  type!: DatasourceType;
  @ColumnTypeOption()
  transform?: ColumnSelectDataTransformer;
  [k: string]: unknown;
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
  value?: SelectValue;
  @ColumnTypeOption()
  multiple? = false;
  @ColumnTypeOption()
  search? = false;
  @ColumnTypeOption()
  disableClear? = false;
  @ColumnTypeOption()
  placeholder? = '';
  @ColumnTypeOption()
  showSelectAll? = false;
  @ColumnTypeOption()
  selectAllTitle?: string;
  @ColumnTypeOption()
  noOptionsText?: string;
  @ColumnTypeOption({
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Boolean],
  })
  editableError?: string | boolean;
  @ColumnTypeOption()
  datasource?: ColumnSelectDatasource;
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
  implements TableColumnComponent<TableColumnSelectConfig>, OnInit
{
  @Input() config?: TableColumnSelectConfig;
  @Input() context?: TableColumnContext;

  constructor(private tableEditableService: TableEditableService) {}

  ngOnInit(): void {
    if (!this.context?.value && this.config?.value) {
      this.valueChangeHandler(this.config?.value);
    }
  }

  valueChangeHandler(inputValue: SelectValue): void {
    // tslint:disable-next-line: no-non-null-assertion
    this.context!.value = inputValue;
    // tslint:disable-next-line: no-non-null-assertion
    this.tableEditableService.updateValue(inputValue, this.context!.config);
  }

  getErrorType(error: string | boolean): boolean {
    return typeof error === 'string';
  }
}
