import {
    ChangeDetectionStrategy,
    Component,
    Injectable,
    Input,
    OnInit,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { AutocompleteValue } from '@spryker/autocomplete';
import { DataTransformerConfig, DataTransformerType } from '@spryker/data-transformer';
import { DatasourceConfig, DatasourceType } from '@spryker/datasource';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteDataTransformer implements DataTransformerConfig {
    type!: DataTransformerType;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteDatasource implements DatasourceConfig {
    type!: DatasourceType;
    transform?: ColumnAutocompleteDataTransformer;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnAutocompleteOptionItem {
    title?: string;
    value?: string | number;
    isDisabled? = false;
}

@Injectable({ providedIn: 'root' })
export class TableColumnAutocompleteConfig {
    options: AutocompleteValue[] = [];
    value?: any;
    type = 'text';
    placeholder? = '';
    prefix?: string;
    suffix?: string;
    outerPrefix?: string;
    outerSuffix?: string;
    editableError?: string | boolean;
    attrs?: Record<string, string>;
    datasource?: ColumnAutocompleteDatasource;
}

@Component({
    standalone: false,
    selector: 'spy-table-column-autocomplete',
    templateUrl: './table-column-autocomplete.component.html',
    styleUrls: ['./table-column-autocomplete.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableEditableService],
})
export class TableColumnAutocompleteComponent implements TableColumnComponent<TableColumnAutocompleteConfig>, OnInit {
    protected tableEditableService = inject(TableEditableService);

    @Input() config?: TableColumnAutocompleteConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;

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
