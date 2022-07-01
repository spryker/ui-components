import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';

import { TableColumnChipComponent } from './table-column-chip.component';
import { TableColumnChipModule } from './table-column-chip.module';

export default {
    title: 'TableColumnChipComponent',
    component: TableColumnChipComponent,
    parameters: {
        controls: {
            include: ['config', 'context'],
        },
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
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: Math.random() > 0.5 ? 1 : 0,
    col3: 'col3',
});

export const primary = (args) => ({
    props: args,
    moduleMetadata: {
        imports: [TableColumnChipModule, DefaultContextSerializationModule],
    },
});
primary.args = {
    config: {
        text: '${value}',
        color: 'red',
    },
    context: {
        value: 'Value for testing',
    },
};

export const withTable = (args) => ({
    props: args,
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
});
withTable.args = {
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
};
withTable.argTypes = {
    context: {
        table: {
            disable: true,
        },
    },
};
