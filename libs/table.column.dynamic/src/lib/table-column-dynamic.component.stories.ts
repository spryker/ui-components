import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { DatasourceInlineModule, DatasourceInlineService } from '@spryker/datasource.inline';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { NotificationModule } from '@spryker/notification';
import { TableModule } from '@spryker/table';
import { TableColumnAutocompleteComponent, TableColumnAutocompleteModule } from '@spryker/table.column.autocomplete';
import { TableColumnSelectComponent, TableColumnSelectModule } from '@spryker/table.column.select';
import { TableColumnTextComponent, TableColumnTextModule } from '@spryker/table.column.text';
import { TableDatasourceDependableService } from '@spryker/table.feature.editable';
import { DatasourceHttpService } from '@spryker/datasource.http';
import { TableColumnInputComponent, TableColumnInputModule } from '@spryker/table.column.input';
import {
    generateMockTableDataFor,
    MockTableDatasourceConfig,
    MockTableDatasourceService,
    TableDataMockGenerator,
} from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';

import { TableColumnDynamicComponent } from './table-column-dynamic.component';
import { TableColumnDynamicModule } from './table-column-dynamic.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `${i}`,
    col2: `Option ${i}`,
    col3: `col3 #${i}`,
});

export default {
    title: 'TableColumnDynamicComponent',
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=1365%3A7734',
            allowFullscreen: true,
        },
    },
    argTypes: {
        //ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
        config: {
            table: {
                disable: true,
            },
        },
        mockHttp: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        config: {
            dataSource: {
                type: 'mock-data',
                dataGenerator: tableDataGenerator,
            } as unknown as MockTableDatasourceConfig,
            columns: [
                { id: 'col1', sortable: true, title: 'Column #1' },
                {
                    id: 'col2',
                    title: 'Column #2',
                    type: 'select',
                    typeOptions: {
                        options: [
                            {
                                title: 'Option 1',
                                value: 'Option 1',
                            },
                            {
                                title: 'Option 2',
                                value: 'Option 2',
                                isDisabled: true,
                            },
                            {
                                title: 'Option 3',
                                value: 'Option 3',
                            },
                        ],
                        placeholder: '123',
                    },
                },
                {
                    id: 'col3',
                    title: 'Column #3',
                    type: 'dynamic',
                    typeOptions: {
                        datasource: {
                            type: 'inline',
                            data: {
                                type: 'select',
                                typeOptions: {
                                    options: [
                                        {
                                            title: 'Option dynamic 1',
                                            value: 'Option dynamic 1',
                                        },
                                        {
                                            title: 'Option dynamic 2',
                                            value: 'Option dynamic 2',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            ],
            editable: {
                columns: [
                    {
                        id: 'col2',
                        type: 'select',
                        typeOptions: {
                            options: ['Option 1', 'Option 2'],
                        },
                    },
                    {
                        id: 'col3',
                        type: 'dynamic',
                        typeOptions: {
                            datasource: {
                                type: 'inline',
                                data: {
                                    type: 'select',
                                    typeOptions: {
                                        options: [
                                            {
                                                title: 'Option dynamic 1',
                                                value: 'Option dynamic 1',
                                            },
                                            {
                                                title: 'Option dynamic 2',
                                                value: 'Option dynamic 2',
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                ],
                create: {
                    addButton: {},
                    cancelButton: {},
                },
            },
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [
            HttpClientTestingModule,
            ContextModule,
            TableModule.forRoot(),
            TableModule.withFeatures({
                editable: () => import('@spryker/table.feature.editable').then((m) => m.TableEditableFeatureModule),
            } as any),
            TableModule.withColumnComponents({
                text: TableColumnTextComponent,
                select: TableColumnSelectComponent,
                dynamic: TableColumnDynamicComponent,
            } as any),
            DatasourceModule.withDatasources({
                'mock-data': MockTableDatasourceService,
                inline: DatasourceInlineService,
            } as any),
            DefaultContextSerializationModule,
            BrowserAnimationsModule,
            DatasourceInlineModule,
            NotificationModule.forRoot(),
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
            TableColumnTextModule,
            TableColumnSelectModule,
            TableColumnDynamicModule,
        ],
        providers: [
            {
                provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                useValue: [
                    LayoutFlatHostComponent,
                    TableColumnTextComponent,
                    TableColumnSelectComponent,
                    TableColumnDynamicComponent,
                ],
                multi: true,
            },
        ],
    },
    template: `
    <spy-table [config]="config"></spy-table>
  `,
});

export const withDependentColumns = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [
            HttpClientTestingModule,
            ContextModule,
            MockHttpModule,
            TableColumnAutocompleteModule,
            TableColumnSelectModule,
            TableColumnInputModule,
            TableColumnDynamicModule,
            TableModule.forRoot(),
            TableModule.withFeatures({
                editable: () => import('@spryker/table.feature.editable').then((m) => m.TableEditableFeatureModule),
            }),
            TableModule.withColumnComponents({
                autocomplete: TableColumnAutocompleteComponent,
                select: TableColumnSelectComponent,
                input: TableColumnInputComponent,
                dynamic: TableColumnDynamicComponent,
            } as any),
            DatasourceModule.withDatasources({
                'mock-data': MockTableDatasourceService,
                dependable: TableDatasourceDependableService,
                http: DatasourceHttpService,
            } as any),
            DefaultContextSerializationModule,
            BrowserAnimationsModule,
            NotificationModule.forRoot(),
            LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
            EnLocaleModule,
        ],
        providers: [
            {
                provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                useValue: [
                    LayoutFlatHostComponent,
                    TableColumnAutocompleteComponent,
                    TableColumnSelectComponent,
                    TableColumnInputComponent,
                    TableColumnDynamicComponent,
                ],
                multi: true,
            },
        ],
    },
    template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
});
withDependentColumns.args = {
    config: {
        dataSource: {
            type: 'mock-data',
            dataGenerator: tableDataGenerator,
        } as unknown as MockTableDatasourceConfig,
        columns: [
            {
                id: 'col1',
                sortable: true,
                title: 'Column #1',
            },
            {
                id: 'col2',
                title: 'Column #2',
            },
            {
                id: 'col3',
                title: 'Column #3',
            },
        ],
        editable: {
            columns: [
                {
                    id: 'col1',
                    type: 'select',
                    typeOptions: {
                        options: [
                            {
                                title: 'series',
                                value: 'series',
                            },
                            {
                                title: 'width',
                                value: 'width',
                            },
                            {
                                title: 'color',
                                value: 'color',
                            },
                        ],
                    },
                },
                {
                    id: 'col2',
                    type: 'dynamic',
                    typeOptions: {
                        datasource: {
                            type: 'dependable',
                            dependsOn: 'col1',
                            datasource: {
                                type: 'http',
                                url: '${row.col1}',
                            },
                        },
                    },
                },
                {
                    id: 'col3',
                    type: 'dynamic',
                    typeOptions: {
                        datasource: {
                            type: 'dependable',
                            dependsOn: 'col1',
                            datasource: {
                                type: 'http',
                                url: '${row.col1}',
                            },
                        },
                    },
                },
            ],
            create: {
                addButton: {},
                cancelButton: {},
                initialData: {
                    data: [
                        {
                            editableNewRow: true,
                            col1: 'series',
                            col2: 'Dependable Option 1',
                        },
                        {
                            editableNewRow: true,
                            col1: 'color',
                            col2: 'Dependable Option 1',
                        },
                        {
                            editableNewRow: true,
                            col1: 'series',
                            col2: 'Dependable Option 2',
                        },
                        {
                            editableNewRow: true,
                            col1: 'width',
                            col2: 'Dependable Option 3',
                        },
                    ],
                    errors: [
                        {
                            rowError: null,
                            columnErrors: [],
                        },
                        {
                            rowError: 'The combination [color] - Black already exists. Please define another one',
                            columnErrors: [],
                        },
                        {
                            rowError: 'The combination [brand] - Samsung already exists. Please define another one',
                            columnErrors: [],
                        },
                    ],
                },
            },
            update: { url: '/update-cell' },
        },
    },
    mockHttp: setMockHttp([
        {
            url: '/data-request',
            dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
        },
        {
            url: '/update-cell',
            data: {},
        },
        {
            url: 'series',
            data: {
                type: 'input',
                typeOptions: {
                    options: [
                        {
                            value: 'Dependable Option 1',
                            title: 'Dependable Option 1',
                        },
                        {
                            value: 'Dependable Option 2',
                            title: 'Dependable Option 2',
                        },
                        {
                            value: 'Dependable Option 3',
                            title: 'Dependable Option 3',
                        },
                    ],
                },
            },
        },
        {
            url: 'width',
            data: {
                type: 'select',
                typeOptions: {
                    options: [
                        {
                            value: 'Dependable Option 1',
                            title: 'Dependable Option 1',
                        },
                        {
                            value: 'Dependable Option 2',
                            title: 'Dependable Option 2',
                        },
                        {
                            value: 'Dependable Option 3',
                            title: 'Dependable Option 3',
                        },
                    ],
                },
            },
        },
        {
            url: 'color',
            data: {
                type: 'autocomplete',
                typeOptions: {
                    options: [
                        {
                            value: 'Dependable Option 1',
                            title: 'Dependable Option 1',
                        },
                        {
                            value: 'Dependable Option 2',
                            title: 'Dependable Option 2',
                        },
                        {
                            value: 'Dependable Option 3',
                            title: 'Dependable Option 3',
                        },
                    ],
                },
            },
        },
    ]),
};
