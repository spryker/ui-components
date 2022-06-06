import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory } from '@storybook/angular';

import { TablePaginationFeatureModule } from './table-pagination-feature.module';

export default {
    title: 'TablePaginationFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export const viaHtml = getPaginationStory(
    `
    <spy-table [config]="config">
      <spy-table-pagination-feature spy-table-feature></spy-table-pagination-feature>
    </spy-table>
  `,
    [TablePaginationFeatureModule],
);

export const viaConfig = getPaginationStory(
    `
    <spy-table [config]="config">
  `,
    [
        TableModule.withFeatures({
            pagination: () => import('./table-pagination-feature.module').then((m) => m.TablePaginationFeatureModule),
        }),
    ],
);

function getPaginationStory(template: string, extraNgModules: any[] = []): () => IStory {
    return () => ({
        moduleMetadata: {
            imports: [
                HttpClientTestingModule,
                BrowserAnimationsModule,
                TableModule.forRoot(),
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
                DefaultContextSerializationModule,
                ...extraNgModules,
            ],
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: [LayoutFlatHostComponent],
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
                pagination: {
                    enabled: true, // This will enable feature via config
                    sizes: [10, 50, 100],
                },
            },
        },
    });
}
