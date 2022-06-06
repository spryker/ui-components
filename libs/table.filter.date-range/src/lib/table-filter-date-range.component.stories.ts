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

import { TableFilterDateRangeComponent } from './table-filter-date-range.component';
import { TableFilterDateRangeModule } from './table-filter-date-range.module';

export default {
    title: 'TableFilterDateRangeComponent',
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
                    'date-range': TableFilterDateRangeComponent,
                } as any),
                DefaultContextSerializationModule,
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
                TableFilterDateRangeModule,
                LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
                EnLocaleModule,
                ...extraNgModules,
            ],
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent, TableFilterDateRangeComponent],
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
    });
}
