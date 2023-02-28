import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { ContextService, DefaultContextSerializationModule } from '@spryker/utils';
import { TableDataConfiguratorService, TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import { TableFilterSelectComponent, TableFilterSelectModule } from '@spryker/table.filter.select';
import { TableFilterTreeSelectComponent, TableFilterTreeSelectModule } from '@spryker/table.filter.tree-select';
import { TableFilterDateRangeComponent, TableFilterDateRangeModule } from '@spryker/table.filter.date-range';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableDataExportActionHandlerService } from './table-data-export-action-handler.service';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
    col4: 'col4',
    col5: 'col5',
    col6: 'col6',
    col7: 'col7',
    col8: 'col8',
});

export default {
    title: 'TableDataExportActionHandlerService',
    parameters: {
        controls: {
            include: ['action'],
        },
    },
    argTypes: {
        //ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
        config: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        action: {
            type: 'table-data-export',
            url: '/html-request',
            tableId: 'someId',
        },
    },
} as Meta;

export const primary = (args) => ({
    props: {
        ...args,
        config: {
            dataSource: {
                type: 'mock-data',
                dataGenerator: tableDataGenerator,
            } as unknown as MockTableDatasourceConfig,
            columns: [
                { id: 'col1', title: 'Column #1', sortable: true, hideable: true },
                { id: 'col2', title: 'Column #2', hideable: false },
                { id: 'col3', title: 'Column #3', hideable: true },
                { id: 'col4', title: 'Column #4', hideable: true },
                { id: 'col5', title: 'Column #5', hideable: true },
                { id: 'col6', title: 'Column #6', hideable: true },
                { id: 'col7', title: 'Column #7', hideable: true },
                { id: 'col8', title: 'Column #8', hideable: true },
            ],
            filters: {
                enabled: true,
                items: [
                    {
                        id: 'select',
                        title: 'Select',
                        type: 'select',
                        typeOptions: {
                            multiselect: false,
                            values: [
                                { value: 1, title: 'Option_1' },
                                { value: 0, title: 'Option_2' },
                            ],
                        },
                    },
                    {
                        id: 'select2',
                        title: 'Select',
                        type: 'select',
                        typeOptions: {
                            multiselect: false,
                            values: [
                                { value: '1', title: 'Option_1' },
                                { value: '0', title: 'Option_2' },
                            ],
                        },
                    },
                    {
                        id: 'select3',
                        title: 'Select',
                        type: 'select',
                        typeOptions: {
                            multiselect: true,
                            values: [
                                { value: 1, title: 'Option_1' },
                                { value: 2, title: 'Option_2' },
                                { value: 3, title: 'Option_3' },
                                { value: 4, title: 'Option_4' },
                                { value: 5, title: 'Option_5' },
                                { value: 0, title: 'Option_0' },
                            ],
                        },
                    },
                    {
                        id: 'tree-select',
                        title: 'Tree-Select',
                        type: 'tree-select',
                        typeOptions: {
                            multiselect: true,
                            values: [
                                {
                                    value: 1,
                                    title: 'Option_1',
                                    children: [
                                        { value: 5, title: 'Option_5' },
                                        { value: 6, title: 'Option_6' },
                                    ],
                                },
                                { value: 2, title: 'Option_2' },
                                { value: 3, title: 'Option_3' },
                                { value: 4, title: 'Option_4' },
                            ],
                        },
                    },
                    {
                        id: 'range',
                        title: 'Range',
                        type: 'range',
                        typeOptions: {
                            placeholderFrom: 'from',
                            format: 'yyyy-MM-dd',
                        },
                    },
                ],
            },
            pagination: {
                enabled: true,
                sizes: [10, 50, 100],
            },
            search: {
                enabled: true,
                placeholder: 'Placeholder',
            },
            total: {
                enabled: true,
            },
            settings: {
                enabled: true,
            },
            title: {
                enabled: true,
                title: 'Table title',
            },
        },
        tableId: 'someId',
        mockHttp: setMockHttp([
            {
                url: '/html-request',
            },
        ]),
    },
    moduleMetadata: {
        imports: [
            MockHttpModule,
            HttpClientTestingModule,
            BrowserAnimationsModule,
            ButtonActionModule,
            ActionsModule.withActions({
                'table-data-export': TableDataExportActionHandlerService,
            }),
            TableModule.forRoot(),
            TableModule.withFeatures({
                filters: () => import('@spryker/table.feature.filters').then((m) => m.TableFiltersFeatureModule),
                pagination: () =>
                    import('@spryker/table.feature.pagination').then((m) => m.TablePaginationFeatureModule),
                search: () => import('@spryker/table.feature.search').then((m) => m.TableSearchFeatureModule),
                total: () => import('@spryker/table.feature.total').then((m) => m.TableTotalFeatureModule),
                settings: () => import('@spryker/table.feature.settings').then((m) => m.TableSettingsFeatureModule),
                title: () => import('@spryker/table.feature.title').then((m) => m.TableTitleFeatureModule),
            }),
            TableFiltersFeatureModule.withFilterComponents({
                select: TableFilterSelectComponent,
                'tree-select': TableFilterTreeSelectComponent,
                range: TableFilterDateRangeComponent,
            } as any),
            DatasourceModule.withDatasources({
                'mock-data': MockTableDatasourceService,
            } as any),
            TableFilterDateRangeModule,
            TableFilterSelectModule,
            TableFilterTreeSelectModule,
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
            DefaultContextSerializationModule,
        ],
        providers: [
            ContextService,
            TableDataConfiguratorService,
            {
                provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                useValue: [
                    LayoutFlatHostComponent,
                    TableFilterSelectComponent,
                    TableFilterTreeSelectComponent,
                    TableFilterDateRangeComponent,
                ],
                multi: true,
            },
        ],
    },
    template: `
        <spy-button-action
            [action]="action"
            [mockHttp]="mockHttp"
            variant="primary"
            size="lg"
        >
            Table Data Export
        </spy-button-action>
        <spy-table [config]="config" [tableId]="tableId">
   `,
});
