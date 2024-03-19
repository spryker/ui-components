import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';

import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';
import { TableColumnDateComponent } from './table-column-date.component';
import { TableColumnDateModule } from './table-column-date.module';

export default {
    title: 'TableColumnDateComponent',
    component: TableColumnDateComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [TableColumnDateModule, DefaultContextSerializationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['config', 'context'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=5181%3A17045',
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
        context: {
            table: {
                disable: true,
            },
        },
    },
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: new Date('2020-01-01T17:25:00'),
    col3: new Date('2020-01-01T17:25:00'),
});

export const primary = (args) => ({
    props: args,
});
primary.args = {
    config: {
        date: '${displayValue}',
        format: 'mediumDate',
    },
    context: {
        displayValue: new Date('2020-01-01T17:25:00'),
    },
};

export const withTable = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(HttpClientTestingModule),
            importProvidersFrom(TableModule.forRoot()),
            importProvidersFrom(
                TableModule.withColumnComponents({
                    date: TableColumnDateComponent,
                } as any),
            ),
            importProvidersFrom(
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
            ),
        ],
    },
    moduleMetadata: {
        imports: [ContextModule, TableModule],
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
                type: 'date',
                typeOptions: {
                    date: '${value}',
                    format: 'mediumDate',
                },
            },
            {
                id: 'col3',
                title: 'Column #3',
                type: 'date',
                typeOptions: {
                    date: '${value}',
                },
            },
        ],
    },
};
