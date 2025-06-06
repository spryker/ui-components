import { ChangeDetectionStrategy, Component, Injectable, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AutocompleteValue } from '@spryker/autocomplete';
import { DataTransformerConfig, DataTransformerType } from '@spryker/data-transformer';
import { DatasourceConfig, DatasourceType } from '@spryker/datasource';
import {
    ColumnTypeOption,
    ColumnTypeOptionsType,
    TableColumnComponent,
    TableColumnContext,
    TableColumnTypeComponent,
} from '@spryker/table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteDataTransformer implements DataTransformerConfig {
    @ColumnTypeOption({ required: true })
    type!: DataTransformerType;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteDatasource implements DatasourceConfig {
    @ColumnTypeOption({ required: true })
    type!: DatasourceType;
    @ColumnTypeOption()
    transform?: ColumnAutocompleteDataTransformer;
    [k: string]: unknown;
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
    value?: any;
    @ColumnTypeOption()
    type = 'text';
    @ColumnTypeOption()
    placeholder? = '';
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
    datasource?: ColumnAutocompleteDatasource;
}

@Component({
    selector: 'spy-table-column-autocomplete',
    templateUrl: './table-column-autocomplete.component.html',
    styleUrls: ['./table-column-autocomplete.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableEditableService],
})
@TableColumnTypeComponent(TableColumnAutocompleteConfig)
export class TableColumnAutocompleteComponent implements TableColumnComponent<TableColumnAutocompleteConfig>, OnInit {
    @Input() config?: TableColumnAutocompleteConfig;
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
