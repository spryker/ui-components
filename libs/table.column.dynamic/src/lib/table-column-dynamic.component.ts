import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injectable,
    Injector,
    Input,
    OnChanges,
    ViewEncapsulation,
} from '@angular/core';
import { DatasourceConfig, DatasourceService, DatasourceType } from '@spryker/datasource';
import {
    ColumnTypeOption,
    ColumnTypeOptionsType,
    TableColumnComponent,
    TableColumnContext,
    TableColumnTypeComponent,
    TableDataRow,
} from '@spryker/table';
import { ContextService, TypedSimpleChanges } from '@spryker/utils';
import { merge, of, ReplaySubject } from 'rxjs';
import { delay, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TableColumnDynamicDatasourceConfig implements DatasourceConfig {
    @ColumnTypeOption({
        required: true,
        type: ColumnTypeOptionsType.TypeOf,
        value: String,
    })
    type!: DatasourceType;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TableColumnDynamicConfig {
    @ColumnTypeOption({ required: true })
    datasource!: TableColumnDynamicDatasourceConfig;
}

@Component({
    standalone: false,
    selector: 'spy-table-column-dynamic',
    templateUrl: './table-column-dynamic.component.html',
    styleUrls: ['./table-column-dynamic.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: { class: 'spy-table-column-dynamic' },
})
@TableColumnTypeComponent(TableColumnDynamicConfig)
export class TableColumnDynamicComponent implements TableColumnComponent<TableColumnDynamicConfig>, OnChanges {
    @Input() config?: TableColumnDynamicConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;

    colData?: TableDataRow;

    private updateColConfig$ = new ReplaySubject<void>(1);

    colConfigEmission$ = this.updateColConfig$.pipe(
        switchMap(() => {
            if (!this.config || !this.context) {
                return of(void 0);
            }

            return this.datasourceService
                .resolve<TableColumnDynamicConfig>(this.injector, this.config.datasource, this.context)
                .pipe(delay(0));
        }),
        map((colConfig) => {
            const config = {
                ...colConfig,
                id: this.context?.config?.id,
                title: this.context?.config?.title,
            };
            return this.interpolateConfigReq(config, this.context);
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    colConfig$ = this.colConfigEmission$.pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    isColConfigLoading$ = merge(
        this.updateColConfig$.pipe(map(() => true)),
        this.colConfigEmission$.pipe(map(() => false)),
    ).pipe(
        tap(() => this.cdr.markForCheck()),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    constructor(
        private injector: Injector,
        private datasourceService: DatasourceService,
        private contextService: ContextService,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnChanges(changes: TypedSimpleChanges<TableColumnComponent>): void {
        if (changes.config || changes.context) {
            this.updateColConfig$.next();
        }

        if (changes.context) {
            this.updateData();
        }
    }

    private updateData(): void {
        const colId = this.context?.config?.id;

        if (!colId) {
            this.colData = {};

            return;
        }

        this.colData = { [colId]: this.context?.value };
    }

    private interpolateConfigReq<T>(config: T, context: any): T {
        switch (typeof config) {
            case 'string':
                return this.contextService.interpolateObj(config, context) as any;
            case 'object':
                return Array.isArray(config)
                    ? (config.map((value) => this.interpolateConfigReq(value, context)) as any)
                    : Object.entries(config).reduce(
                          (acc, [key, value]) => ({
                              ...acc,
                              [key]: this.interpolateConfigReq(value, context),
                          }),
                          {} as T,
                      );
            default:
                return config;
        }
    }
}
