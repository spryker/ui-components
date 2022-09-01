import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { IStory, Meta } from '@storybook/angular';

import { TablePaginationFeatureModule } from './table-pagination-feature.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export default {
    title: 'TablePaginationFeatureComponent',
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
            pagination: {
                enabled: true, // This will enable feature via config
                sizes: [10, 50, 100],
            },
        },
    },
} as Meta;

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
    <spy-table [config]="config"></spy-table>
  `,
    [
        TableModule.withFeatures({
            pagination: () => import('./table-pagination-feature.module').then((m) => m.TablePaginationFeatureModule),
        }),
    ],
);

function getPaginationStory(template: string, extraNgModules: any[] = []): (args) => IStory {
    return (args) => ({
        props: args,
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
    });
}
