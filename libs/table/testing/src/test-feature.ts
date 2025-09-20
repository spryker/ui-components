/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    InjectionToken,
    Injector,
    OnChanges,
    TemplateRef,
    ViewContainerRef,
    SimpleChanges,
    Input,
    inject,
} from '@angular/core';
import {
    TableColumns,
    TableColumnsResolverService,
    TableData,
    TableDataConfiguratorService,
    TableDatasourceService,
    TableFeatureComponent,
    TableFeatureEventBus,
    TableFeatureTplContext,
    TableEventBus,
    TableComponent,
    TableFeatureConfig,
} from '@spryker/table';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

class MockElementRef {
    nativeElement = {
        querySelector: () => jest.fn(),
    };
}

class MockInjector {
    get = jest.fn();
}

export class TableMockComponent implements TableComponent {
    events = {};
    // cast any because of ts error of `TableConfig` paths conflict
    config$ = new ReplaySubject<any>(1);
    columns$ = new ReplaySubject<TableColumns>(1);
    data$ = new ReplaySubject<TableData>(1);
    isLoading$ = new ReplaySubject<boolean>(1);
    tableId$ = new BehaviorSubject<string>('mockTableId');
    updateRowClasses = jest.fn();
    setRowClasses = jest.fn();
    eventHandler = jest.fn();
    tableElementRef = new MockElementRef() as unknown as ElementRef<HTMLElement>;
    injector = new MockInjector();
    eventBus = new TableEventBus(this.eventHandler);
    features$ = new ReplaySubject<TableFeatureComponent<TableFeatureConfig>[]>(1);
    on = jest.fn();
    findFeatureByName = jest.fn();
    findFeatureByType = jest.fn();
}

export interface TableFeatureMocks<T = TableMockComponent> {
    table: Partial<T>;
    config: any;
    eventBus: Partial<TableFeatureEventBus>;
    columnsResolverService: Partial<TableColumnsResolverService>;
    dataSourceService: Partial<TableDatasourceService>;
    dataConfiguratorService: Partial<TableDataConfiguratorService>;
}

export const TestTableFeatureMocks = new InjectionToken<TableFeatureMocks>('TestTableFeatureMocks');

export function initFeature<T>(
    feature: TableFeatureComponent,
    mocks: Partial<TableFeatureMocks<T>> = {},
    injector: Injector,
): TableFeatureMocks<T> {
    const table = mocks.table || (new TableMockComponent() as any);
    const config = mocks.config as any;
    const eventBus = mocks.eventBus || (new TableFeatureEventBus(feature.name, table.eventBus) as any);
    const columnsResolverService = mocks.columnsResolverService || (injector.get(TableColumnsResolverService) as any);
    const dataSourceService = mocks.dataSourceService || (injector.get(TableDatasourceService) as any);
    const dataConfiguratorService =
        mocks.dataConfiguratorService || (injector.get(TableDataConfiguratorService) as any);

    feature.setTableComponent(table);
    feature.setConfig(config);
    feature.setTableEventBus(eventBus);
    feature.setColumnsResolverService(columnsResolverService);
    feature.setDataSourceService(dataSourceService);
    feature.setDataConfiguratorService(dataConfiguratorService);

    return {
        table,
        config,
        eventBus,
        columnsResolverService,
        dataConfiguratorService,
        dataSourceService,
    };
}

@Component({
    standalone: false,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-table-feature',
    template: ` <ng-content></ng-content> `,
})
export class TestTableFeatureComponent<T = TableMockComponent> implements AfterContentInit {
    private cdr = inject(ChangeDetectorRef);
    private globalMocks = inject<TableFeatureMocks<T> | null>(TestTableFeatureMocks, { optional: true });
    private injector = inject(Injector);

    @ContentChild(TableFeatureComponent) feature?: TableFeatureComponent;

    featureMocks?: TableFeatureMocks<T>;

    ngAfterContentInit(): void {
        if (!this.feature) {
            return;
        }

        this.featureMocks = initFeature<T>(this.feature, this.globalMocks ?? undefined, this.injector);
    }
}

export const TestTableFeatureTplContext = new InjectionToken<Record<string, TableFeatureTplContext>>(
    'TestTableFeatureTplContext',
);

@Directive({ standalone: false, selector: '[spyTableFeatureTpl]' })
export class TestTableFeatureTplDirective implements OnChanges {
    template = inject<TemplateRef<TableFeatureTplContext>>(TemplateRef);
    vcr = inject(ViewContainerRef);
    locationContext? = inject(TestTableFeatureTplContext, {
        optional: true,
    });

    @Input() spyTableFeatureTpl?: string | string[];
    @Input() spyTableFeatureTplStyles?: Record<string, any>;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.spyTableFeatureTpl) {
            const locations = Array.isArray(this.spyTableFeatureTpl!)
                ? this.spyTableFeatureTpl!
                : [this.spyTableFeatureTpl!];
            this.vcr.clear();
            locations.forEach((location) =>
                this.vcr.createEmbeddedView(this.template, this.locationContext?.[location]),
            );
        }
    }
}
