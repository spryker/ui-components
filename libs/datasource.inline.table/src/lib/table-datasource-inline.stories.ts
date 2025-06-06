import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { MockHttpModule } from '@spryker/internal-utils';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import { TableFilterDateRangeComponent, TableFilterDateRangeModule } from '@spryker/table.filter.date-range';
import { TableFilterSelectComponent, TableFilterSelectModule } from '@spryker/table.filter.select';
import { DateFnsDateAdapterModule } from '@spryker/utils.date.adapter.date-fns';

import { TableDatasourceInlineModule } from './table-datasource-inline.module';
import { TableDatasourceInlineService } from './table-datasource-inline.service';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'TableDatasourceInlineService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(TableDatasourceInlineModule.withConfig()),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(DateFnsDateAdapterModule),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'inline.table': TableDatasourceInlineService,
                    } as any),
                ),
                importProvidersFrom(
                    TableModule.withFeatures({
                        pagination: () =>
                            import('@spryker/table.feature.pagination').then((m) => m.TablePaginationFeatureModule),
                        filters: () =>
                            import('@spryker/table.feature.filters').then((m) => m.TableFiltersFeatureModule),
                        search: () => import('@spryker/table.feature.search').then((m) => m.TableSearchFeatureModule),
                    }),
                ),
                importProvidersFrom(
                    TableFiltersFeatureModule.withFilterComponents({
                        select: TableFilterSelectComponent,
                        'date-range': TableFilterDateRangeComponent,
                    } as any),
                ),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [MockHttpModule, TableModule, TableFilterSelectModule, TableFilterDateRangeModule],
        }),
    ],
    args: {
        config: {
            dataSource: {
                type: 'inline.table',
                data: [
                    {
                        col1: 1,
                        col2: 'col 2',
                        col3: '2020-09-24T15:20:08+02:00',
                        col4: '2020-09-24T15:20:08+02:00',
                    },
                    {
                        col1: 2,
                        col2: 'col 1v',
                        col3: '2020-09-22T15:20:08+02:00',
                        col4: '2020-09-22T15:20:08+02:00',
                    },
                    {
                        col1: 2,
                        col2: 'col 3v',
                        col3: '2020-09-26T15:20:08+02:00',
                        col4: '2020-09-26T15:20:08+02:00',
                    },
                    {
                        col1: 2,
                        col2: 'col 4v',
                        col3: '2020-10-01T15:20:08+02:00',
                        col4: '2020-10-01T15:20:08+02:00',
                    },
                    {
                        col1: 3,
                        col2: 'col2v',
                        col3: '2020-10-11T15:20:08+02:00',
                        col4: '2020-10-11T15:20:08+02:00',
                    },
                    {
                        col1: 2,
                        col2: 'col 2v',
                        col3: '2020-10-18T15:20:08+02:00',
                        col4: '2020-10-18T15:20:08+02:00',
                    },
                ],
                filter: {
                    select1: {
                        type: 'equals',
                        propNames: 'col1',
                    },
                    select2: {
                        type: 'equals',
                        propNames: ['col2', 'col1'],
                    },
                    date: {
                        type: 'range',
                        propNames: 'col3',
                    },
                    date1: {
                        type: 'range',
                        propNames: ['col3', 'col4'],
                    },
                },
                search: {
                    type: 'text',
                    propNames: ['col1', 'col2'],
                },
                transformerByPropName: {
                    col3: 'date',
                    col4: 'date',
                },
            },
            columns: [
                { id: 'col1', title: 'Column #1', width: '20%', sortable: true },
                { id: 'col2', title: 'Column #2', width: '20%', sortable: true },
                { id: 'col3', title: 'Column #3' },
                { id: 'col4', title: 'Column #4' },
            ],
            pagination: {
                enabled: true,
                sizes: [4, 8, 10],
            },
            search: {
                enabled: true,
                placeholder: 'Column 1, Column 2',
            },
            filters: {
                enabled: true,
                items: [
                    {
                        id: 'select1',
                        title: 'Column 1',
                        type: 'select',
                        typeOptions: {
                            multiselect: false,
                            values: [
                                { value: 1, title: 1 },
                                { value: 2, title: 2 },
                                { value: 3, title: 3 },
                            ],
                        },
                    },
                    {
                        id: 'select2',
                        title: 'Column 2, Column 1',
                        type: 'select',
                        typeOptions: {
                            multiselect: true,
                            values: [
                                { value: 'col2v', title: 'col2v col2' },
                                { value: 'col 4v', title: 'col 4v col2' },
                                { value: 1, title: '1 col1' },
                                { value: 4, title: 'Option_4' },
                                { value: 5, title: 'Option_5' },
                                { value: 0, title: 'Option_0' },
                            ],
                        },
                    },
                    {
                        id: 'date',
                        title: 'Column 3',
                        type: 'date-range',
                    },
                    {
                        id: 'date1',
                        title: 'Column 3, Column 4',
                        type: 'date-range',
                    },
                ],
            },
        },
    },
} as Meta;

export const withTable = (args) => ({
    props: args,
    template: `
    <spy-table [config]="config"></spy-table>
  `,
});
