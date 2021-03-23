import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AutocompleteValue } from '@spryker/autocomplete';
import { DatasourceConfig } from '@spryker/datasource';
import {
  ColumnTypeOption,
  ColumnTypeOptionsType,
  TableColumnComponent,
  TableColumnContext,
} from '@spryker/table';
import { TableEditableService } from '@spryker/table.feature.editable';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    autocomplete: TableColumnAutocompleteConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteOptionItem {
  @ColumnTypeOption({ required: true })
  title?: string;
  @ColumnTypeOption({
    required: true,
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Number],
  })
  value?: string | number;
  @ColumnTypeOption()
  isDisabled? = false;
}

@Injectable({ providedIn: 'root' })
export class TableColumnAutocompleteConfig {
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
        value: ColumnAutocompleteOptionItem,
      },
    ],
  })
  options: AutocompleteValue[] = [];
  @ColumnTypeOption()
  type = 'text';
  @ColumnTypeOption()
  placeholder = '';
  @ColumnTypeOption()
  prefix?: string;
  @ColumnTypeOption()
  suffix?: string;
  @ColumnTypeOption()
  outerPrefix?: string;
  @ColumnTypeOption()
  outerSuffix?: string;
  @ColumnTypeOption({
    type: ColumnTypeOptionsType.AnyOf,
    value: [String, Boolean],
  })
  editableError?: string | boolean;
  @ColumnTypeOption()
  attrs?: Record<string, string>;
  @ColumnTypeOption()
  datasource?: DatasourceConfig;
}

@Component({
  selector: 'spy-table-column-autocomplete',
  templateUrl: './table-column-autocomplete.component.html',
  styleUrls: ['./table-column-autocomplete.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableEditableService],
})
export class TableColumnAutocompleteComponent
  implements
    TableColumnComponent<TableColumnAutocompleteConfig>,
    OnInit,
    OnChanges {
  @Input() config?: TableColumnAutocompleteConfig;
  @Input() context?: TableColumnContext;

  constructor(
    private initialConfig: TableColumnAutocompleteConfig,
    private tableEditableService: TableEditableService,
  ) {}

  valueChangeHandler(inputValue: string) {
    // tslint:disable-next-line: no-non-null-assertion
    this.context!.value = inputValue;
    // tslint:disable-next-line: no-non-null-assertion
    this.tableEditableService.updateValue(inputValue, this.context!.config);
  }

  getErrorType(error: string | boolean) {
    return typeof error === 'string';
  }

  ngOnInit(): void {
    this.config = {
      ...this.initialConfig,
      ...this.config,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange) {
      this.config = {
        ...this.initialConfig,
        ...this.config,
      };
    }
  }
}
