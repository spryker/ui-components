import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColumnTypeOption,
  TableColumnComponent,
  TableColumnContext,
  TableColumnTypeComponent,
} from '@spryker/table';
import { TableEditableService } from '@spryker/table.feature.editable';

declare module '@spryker/table' {
  interface TableColumnTypeRegistry {
    input: TableColumnInputConfig;
  }
}

@Injectable({ providedIn: 'root' })
export class TableColumnInputConfig {
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
  @ColumnTypeOption()
  editableError?: string | boolean;
}

@Component({
  selector: 'spy-table-column-input',
  templateUrl: './table-column-input.component.html',
  styleUrls: ['./table-column-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableEditableService],
  host: {
    class: 'spy-table-column-input',
  },
})
@TableColumnTypeComponent(TableColumnInputConfig)
export class TableColumnInputComponent
  implements TableColumnComponent<TableColumnInputConfig> {
  @Input() config?: TableColumnInputConfig;
  @Input() context?: TableColumnContext;

  constructor(private tableEditableService: TableEditableService) {}

  valueChangeHandler(inputValue: string) {
    // tslint:disable-next-line: no-non-null-assertion
    this.context!.value = inputValue;
    // tslint:disable-next-line: no-non-null-assertion
    this.tableEditableService.updateValue(inputValue, this.context!.config);
  }
}
