import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
    inject,
    Type,
    Injector,
} from '@angular/core';
import { ContextService } from '@spryker/utils';
import { TableColumn, TableColumnTplContext, TableColumnTypeDef, TableDataRow } from '../table/table';
import { TableColumnComponentsToken } from '../column-type';
import { TableColumnLocalContextToken } from '../table/table-column.service';

export interface TableColumnConfigItem {
    component: string;
    config?: any;
    items?: TableColumnConfigItem[];
}

@Component({
    standalone: false,
    selector: 'spy-table-column-renderer',
    templateUrl: './table-column-renderer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableColumnRendererComponent implements OnChanges {
    private components = inject(TableColumnComponentsToken).reduce((acc, curr) => ({ ...acc, ...curr }), {});
    private contextService = inject(ContextService);
    private injector = inject(Injector);

    @Input() config?: TableColumn;
    @Input() data?: TableDataRow;
    @Input() template?: TemplateRef<TableColumnTplContext>;
    @Input() i?: number;
    @Input() j?: number;
    @Input() context?: Record<string, unknown>;

    itemConfig?: TableColumnConfigItem;
    originalConfig?: TableColumn;
    dynamicComponent?: Type<any>;
    componentInputs?: Record<string, any>;
    componentInjector?: Injector;

    value?: unknown;
    displayValue?: unknown;
    isValueUndefined?: boolean;
    fullContext?: TableColumnTplContext;
    emptyValue?: string;
    defaultEmptyValue = '-';

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config) {
            this.originalConfig = { ...this.config } as TableColumn;
        } else if (changes.data) {
            this.config = { ...this.originalConfig } as TableColumn;
        }

        if (changes.config || changes.data) {
            this.updateValues();
        } else if (changes.i) {
            this.updateDataValues();
            this.updateTplContext();
        }

        if (changes.context) {
            this.updateTplContext();
        }
    }

    private updateValues(): void {
        this.updateDataValues();
        this.updateTplContext();
        this.updateConfig();
        this.updateItemConfig();
    }

    private updateDataValues(): void {
        if (!this.config) {
            return;
        }

        this.emptyValue = this.config.emptyValue || this.defaultEmptyValue;
        this.value = this.data?.[this.config.id];
        this.displayValue =
            this.config.displayKey && this.data?.[this.config.displayKey]
                ? this.data?.[this.config.displayKey]
                : this.value;
        this.isValueUndefined = this.value === undefined || this.value === null;
    }

    private updateConfig(): void {
        this.config = this.mapConfig(this.config);

        if (this.fullContext && this.config) {
            this.fullContext.config = this.config;
        }
    }

    private updateTplContext(): void {
        if (!this.config) {
            return;
        }

        this.fullContext = {
            ...this.context,
            $implicit: this.value,
            config: this.config,
            row: this.data || {},
            value: this.value,
            displayValue: this.displayValue,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            i: this.i!,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            j: this.j!,
        };
    }

    private updateItemConfig(): void {
        if (!this.config || !this.config.type) {
            this.itemConfig = undefined;
            this.dynamicComponent = undefined;
            this.componentInputs = undefined;
            this.componentInjector = undefined;
            return;
        }

        this.itemConfig = this.configColumnToItem(this.config as TableColumnTypeDef);

        this.dynamicComponent = this.components[this.config.type];

        if (this.dynamicComponent) {
            this.componentInputs = {
                config: this.itemConfig?.config || this.config?.typeOptions,
                context: this.fullContext,
                items: this.itemConfig?.items || [],
            };
            this.componentInjector = Injector.create({
                parent: this.injector,
                providers: [
                    {
                        provide: TableColumnLocalContextToken,
                        useValue: () => this.fullContext,
                    },
                ],
            });
        }
    }

    private mapConfig(config?: TableColumn): TableColumn | undefined {
        if (!config) {
            return;
        }

        return this.mapConfigChildren(config);
    }

    private mapConfigChildren<T extends TableColumnTypeDef>(config: T): T {
        let { typeOptions } = config;

        if (config.typeOptionsMappings) {
            typeOptions = Object.entries(config.typeOptionsMappings).reduce((mapOptions, [mapKey, mapOption]) => {
                if (!Object.prototype.hasOwnProperty.call(mapOption, String(this.value))) {
                    return mapOptions;
                }

                const matchedValue = mapOption[String(this.value)];
                const interpolatedValue = this.contextService.interpolate(matchedValue, this.fullContext as any);

                return { ...mapOptions, [mapKey]: interpolatedValue };
            }, typeOptions);
        }

        const children = config.typeChildren?.map(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (c) => this.mapConfigChildren(c)!,
        );

        return { ...config, typeOptions, typeChildren: children };
    }

    private configColumnToItem(config: TableColumnTypeDef): TableColumnConfigItem {
        return {
            component: config.type || '',
            config: config.typeOptions,
            items: config.typeChildren?.map((c) => this.configColumnToItem(c)),
        };
    }
}
