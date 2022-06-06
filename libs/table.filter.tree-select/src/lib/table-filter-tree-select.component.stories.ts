import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from '@spryker/table.feature.filters';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TableFilterTreeSelectComponent } from './table-filter-tree-select.component';
import { TableFilterTreeSelectModule } from './table-filter-tree-select.module';

export default {
    title: 'TableFilterTreeSelectComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export const viaHtml = getFiltersStory(
    `
    <spy-table [config]="config">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
    [TableFiltersFeatureModule],
);

export const viaConfig = getFiltersStory(
    `
    <spy-table [config]="config">
  `,
    [
        TableModule.withFeatures({
            filters: () => import('@spryker/table.feature.filters').then((m) => m.TableFiltersFeatureModule),
        }),
    ],
);

function getFiltersStory(template: string, extraNgModules: any[] = []): () => IStory {
    return () => ({
        moduleMetadata: {
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TableModule.forRoot(),
                TableFiltersFeatureModule.withFilterComponents({
                    'tree-select': TableFilterTreeSelectComponent,
                } as any),
                DefaultContextSerializationModule,
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
                TableFilterTreeSelectModule,
                LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
                EnLocaleModule,
                ...extraNgModules,
            ],
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent, TableFilterTreeSelectComponent],
                    multi: true,
                },
            ],
        },
        template,
        props: {
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
                            id: 'tree-select',
                            title: 'TreeSelect',
                            type: 'tree-select',
                            typeOptions: {
                                multiselect: true,
                                values: [
                                    { value: 1, title: 'Option_1' },
                                    {
                                        value: 2,
                                        title: 'Option_2',
                                        children: [
                                            { value: 9, title: 'Option_9' },
                                            { value: 10, title: 'Option_10' },
                                            { value: 11, title: 'Option_11' },
                                            { value: 12, title: 'Option_12' },
                                        ],
                                    },
                                    { value: 3, title: 'Option_3' },
                                    { value: 4, title: 'Option_4' },
                                    { value: 5, title: 'Option_5' },
                                    { value: 0, title: 'Option_0' },
                                ],
                            },
                        },
                    ],
                },
            },
        },
    });
}
