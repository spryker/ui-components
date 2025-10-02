import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Injectable,
    Input,
    OnInit,
    OnChanges,
} from '@angular/core';
import { TableColumnComponent, TableColumn, TableColumnContext, TableColumnTypeDef } from '../table/table';
import { PopoverPosition, PopoverTrigger } from '@spryker/popover';

export class TableColumnListConfigInner {
    type?: string;
    typeOptions?: object;
    typeChildren?: TableColumnListConfigInner[];
}

@Injectable({ providedIn: 'root' })
export class TableColumnListConfig extends TableColumnListConfigInner {
    limit? = 2;
}

@Component({
    standalone: false,
    selector: 'spy-table-column-list',
    templateUrl: './table-column-list.component.html',
    styleUrls: ['./table-column-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableColumnListComponent implements TableColumnComponent<TableColumnListConfig>, OnInit, OnChanges {
    @Input() config?: TableColumnListConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: any;

    values: unknown[] = [];
    valuesLimited: unknown[] = [];
    configs: TableColumn[] = [];
    popoverPosition = PopoverPosition.RightTop;
    popoverTrigger = PopoverTrigger.Hover;

    ngOnInit(): void {
        this.updateValues();
        this.updateConfigs();
    }

    ngOnChanges(): void {
        this.updateValues();
        this.updateConfigs();
    }

    private updateValues(): void {
        if (!this.context) {
            return;
        }

        const value = this.context.value;
        const isLimited = this.config && Boolean(this.config.limit);
        let values = Array.isArray(value) ? value : [value];
        values = values.length ? (values as unknown[]) : [undefined];
        this.values = values.map((_value) => ({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ...this.context!.row,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [this.context!.config.id]: _value,
        }));
        this.valuesLimited =
            Array.isArray(value) && isLimited ? this.values.slice(0, this.config?.limit) : [...this.values];
    }

    private updateConfigs(): void {
        this.configs = this.values.map(() => {
            const config = { ...this.context?.config };

            delete (config as TableColumnTypeDef).type;
            delete (config as TableColumnTypeDef).typeOptions;
            delete (config as TableColumnTypeDef).typeChildren;
            delete (config as TableColumnTypeDef).typeOptionsMappings;

            Object.assign(config, this.config);

            delete (config as TableColumnListConfig).limit;

            return config as TableColumn;
        });
    }
}
