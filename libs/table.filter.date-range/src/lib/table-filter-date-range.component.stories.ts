import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRangeModule } from './table-filter-date-range.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export default {
    title: 'TableFilterDateRangeComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(HttpClientTestingModule),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(
                    TableFiltersFeatureModule.withFilterComponents({
                        'date-range': TableFilterDateRangeComponent,
                    } as any),
                ),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
                importProvidersFrom(LocaleModule.forRoot({ defaultLocale: EN_LOCALE })),
                importProvidersFrom(EnLocaleModule),
            ],
        }),
        moduleMetadata({
            imports: [TableModule, DefaultContextSerializationModule, TableFilterDateRangeModule],
        }),
    ],
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
    },
    args: {
        config: {
            dataSource: {
                type: 'mock-data',
                dataGenerator: tableDataGenerator,
            } as unknown as MockTableDatasourceConfig,
            columns: [
                { id: 'col1', title: 'Column #1' },
                { id: 'col2', title: 'Column #2' },
                { id: 'col3', title: 'Column #3' },
            ],
            filters: {
                enabled: true, // This will enable feature via config
                items: [
                    {
                        id: 'range',
                        title: 'Range',
                        type: 'date-range',
                        typeOptions: {
                            placeholderFrom: 'from',
                            placeholderTo: 'to',
                        },
                    },
                ],
            },
        },
    },
} as Meta;

export const viaHtml = (args) => ({
    props: args,
    moduleMetadata: { imports: [TableFiltersFeatureModule] },
    template: `
    <spy-table [config]='config'>
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
});

export const viaConfig = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    filters: () => import('@spryker/table.feature.filters').then((m) => m.TableFiltersFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]='config'></spy-table>
  `,
});
