import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { ContextModule, DefaultContextSerializationModule } from '@spryker/utils';

import { TableColumnInputComponent } from './table-column-input.component';
import { TableColumnInputModule } from './table-column-input.module';

export default {
    title: 'TableColumnInputComponent',
    component: TableColumnInputComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations()],
        }),
        moduleMetadata({
            imports: [TableColumnInputModule, DefaultContextSerializationModule],
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
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1`,
    col2: `${i}`,
    col3: `#${i}`,
});

export const primary = (args) => ({
    props: args,
});
primary.args = {
    config: {
        placeholder: '${placeholder}',
    },
    context: {
        placeholder: '123',
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
                    input: TableColumnInputComponent,
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
                type: 'input',
                typeOptions: {
                    type: 'number',
                    attrs: {
                        step: 0.05,
                    },
                },
            },
            {
                id: 'col3',
                title: 'Column #3',
                type: 'input',
                typeOptions: {
                    prefix: 'pre',
                    suffix: 'suf',
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
