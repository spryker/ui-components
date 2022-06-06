import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnChipComponent } from './table-column-chip.component';
import { TableColumnChipModule } from './table-column-chip.module';

export default {
    title: 'TableColumnChipComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: Math.random() > 0.5 ? 1 : 0,
    col3: 'col3',
});

export const primary = (): IStory => ({
    moduleMetadata: {
        imports: [TableColumnChipModule, DefaultContextSerializationModule],
    },
    component: TableColumnChipComponent,
    props: {
        config: object('Config', {
            text: '${value}',
            color: 'red',
        }),
        context: object('Context', {
            value: 'Value for testing',
        }),
    },
});

export const withTable = (): IStory => ({
    moduleMetadata: {
        imports: [
            HttpClientTestingModule,
            ContextModule,
            TableColumnChipModule,
            TableModule.forRoot(),
            TableModule.withColumnComponents({
                chip: TableColumnChipComponent,
            } as any),
            DatasourceModule.withDatasources({
                'mock-data': MockTableDatasourceService,
            } as any),
            DefaultContextSerializationModule,
            BrowserAnimationsModule,
        ],
        providers: [
            {
                provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                useValue: [LayoutFlatHostComponent, TableColumnChipComponent],
                multi: true,
            },
        ],
    },
    template: `
    <spy-table [config]="config"></spy-table>
  `,
    props: {
        config: {
            dataSource: {
                type: 'mock-data',
                dataGenerator: tableDataGenerator,
            } as unknown as MockTableDatasourceConfig,
            columns: [
                { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
                {
                    id: 'col2',
                    title: 'Column #2',
                    type: 'chip',
                    sortable: true,
                    typeOptions: {
                        color: 'gray',
                    },
                    typeOptionsMappings: {
                        color: { 0: 'red' },
                    },
                },
                {
                    id: 'col3',
                    title: 'Column #3',
                    type: 'chip',
                    typeOptions: {
                        text: '${value}',
                        color: 'blue',
                    },
                },
            ],
        },
    },
});
