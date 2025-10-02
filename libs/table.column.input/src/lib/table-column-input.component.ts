import {
    ChangeDetectionStrategy,
    Component,
    Injectable,
    Input,
    OnInit,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
import { TableEditableService } from '@spryker/table.feature.editable';

@Injectable({ providedIn: 'root' })
export class TableColumnInputConfig {
    type = 'text';
    value?: any;
    placeholder = '';
    prefix?: string;
    suffix?: string;
    outerPrefix?: string;
    outerSuffix?: string;
    editableError?: string | boolean;
    attrs?: Record<string, string>;
}

@Component({
    standalone: false,
    selector: 'spy-table-column-input',
    templateUrl: './table-column-input.component.html',
    styleUrls: ['./table-column-input.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TableEditableService],
})
export class TableColumnInputComponent implements TableColumnComponent<TableColumnInputConfig>, OnInit {
    private tableEditableService = inject(TableEditableService);

    @Input() config?: TableColumnInputConfig;
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
