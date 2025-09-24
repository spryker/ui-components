import { ChangeDetectionStrategy, Component, Injectable, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
    ColumnTypeOption,
    ColumnTypeOptionsType,
    TableColumnComponent,
    TableColumnContext,
    TableColumnTypeComponent,
} from '@spryker/table';
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class TableColumnInputConfig {
    @ColumnTypeOption()
    type = 'text';
    @ColumnTypeOption()
    value?: any;
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
}

@Component({
    selector: 'spy-table-column-input',
    templateUrl: './table-column-input.component.html',
    styleUrls: ['./table-column-input.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableEditableService],
})
@TableColumnTypeComponent(TableColumnInputConfig)
export class TableColumnInputComponent implements TableColumnComponent<TableColumnInputConfig>, OnInit {
    @Input() config?: TableColumnInputConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;

    constructor(private tableEditableService: TableEditableService) {}

    ngOnInit(): void {
        if (!this.context?.value && this.config?.value) {
            this.valueChangeHandler(this.config?.value);
        }
    }

    valueChangeHandler(inputValue: string): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.context!.value = inputValue;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.tableEditableService.updateValue(inputValue, this.context!.config);
    }

    getErrorType(error: string | boolean): boolean {
        return typeof error === 'string';
    }
}
