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

import { TableFilterSelectComponent } from './table-filter-select.component';
import { TableFilterSelectModule } from './table-filter-select.module';

export default {
    title: 'TableFiltersSelectComponent',
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
                    select: TableFilterSelectComponent,
                } as any),
                DefaultContextSerializationModule,
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
                TableFilterSelectModule,
                LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
                EnLocaleModule,
                ...extraNgModules,
            ],
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent, TableFilterSelectComponent],
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
                            id: 'select1',
                            title: 'Column 1',
                            type: 'select',
                            typeOptions: {
                                multiselect: false,
                                values: [
                                    { value: 1, title: 'Option_1' },
                                    { value: 2, title: 'Option_2' },
                                    { value: 0, title: 'Option_0' },
                                ],
                            },
                        },
                        {
                            id: 'select2',
                            title: 'Column 2',
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
                            id: 'select3',
                            title: 'Column 3',
                            type: 'select',
                            typeOptions: {
                                multiselect: false,
                                values: [
                                    { value: 1, title: 'Option_1' },
                                    { value: 2, title: 'Option_2' },
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
