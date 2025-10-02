import {
    ChangeDetectionStrategy,
    Component,
    Injectable,
    Input,
    OnInit,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { DataTransformerConfig, DataTransformerType } from '@spryker/data-transformer';
import { DatasourceConfig, DatasourceType } from '@spryker/datasource';
import { SelectOption, SelectValue, SelectValueSelected } from '@spryker/select';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class ColumnSelectDataTransformer implements DataTransformerConfig {
    type!: DataTransformerType;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnSelectDatasource implements DatasourceConfig {
    type!: DatasourceType;
    transform?: ColumnSelectDataTransformer;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ColumnSelectOptionItem {
    title = '';
    value: SelectValue;
    isDisabled? = false;
}

@Injectable({ providedIn: 'root' })
export class TableColumnSelectConfig {
    options: (SelectOption | ColumnSelectOptionItem)[] = [];
    value?: SelectValue;
    multiple? = false;
    search? = false;
    disableClear? = false;
    placeholder? = '';
    showSelectAll? = false;
    selectAllTitle?: string;
    noOptionsText?: string;
    editableError?: string | boolean;
    datasource?: ColumnSelectDatasource;
    tags? = false;
    tagView? = false;
}

@Component({
    standalone: false,
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
export class TableColumnSelectComponent implements TableColumnComponent<TableColumnSelectConfig>, OnInit {
    private tableEditableService = inject(TableEditableService);

    @Input() config?: TableColumnSelectConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;

    ngOnInit(): void {
        if (!this.context?.value && this.config?.value) {
            this.valueChangeHandler(this.config?.value);
        }
    }

    valueChangeHandler(inputValue: SelectValueSelected): void {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.context!.value = inputValue;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.tableEditableService.updateValue(inputValue, this.context!.config);
    }

    getErrorType(error: string | boolean): boolean {
        return typeof error === 'string';
    }
}
