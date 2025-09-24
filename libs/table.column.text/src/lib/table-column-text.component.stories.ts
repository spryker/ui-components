import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';

import { TableColumnTextComponent } from './table-column-text.component';
import { TableColumnTextModule } from './table-column-text.module';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'TableColumnTextComponent',
    component: TableColumnTextComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [TableColumnTextModule, DefaultContextSerializationModule],
        }),
    ],
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
    args: {
        config: {
            text: '${value}',
        },
        context: {
            value: 'Dynamic text',
        },
    },
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'very looooooooooooooooooooooooooooooooooong col',
    col3: 'col3',
    col4: 'col4',
});

export const primary = (args) => ({
    props: args,
});

export const withTable = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            provideHttpClient(),
            provideHttpClientTesting(),
            importProvidersFrom(TableModule.forRoot()),
            importProvidersFrom(
                TableModule.withColumnComponents({
                    text: TableColumnTextComponent,
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
            { id: 'col1', sortable: true, title: 'Column #1' },
            {
                id: 'col2',
                title: 'Column #2',
                type: 'text',
                typeOptions: {
                    text: '${value}',
                },
            },
            {
                id: 'col3',
                title: 'Column #3',
                type: 'text',
                typeOptions: {
                    text: '${value}',
                },
                typeOptionsMappings: {
                    color: { col3: 'green' },
                },
            },
            {
                id: 'col4',
                title: 'Column #4',
                type: 'text',
                typeOptions: {
                    text: '${value} in ${row.col1}',
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
