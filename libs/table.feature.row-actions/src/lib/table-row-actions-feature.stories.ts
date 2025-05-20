import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DatasourceModule } from '@spryker/datasource';
import { TableActionTriggeredEvent, TableModule } from '@spryker/table';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableRowActionsFeatureModule } from './table-row-actions-feature.module';
import { provideHttpClient } from '@angular/common/http';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
    availableActions: i % 2 === 0 ? ['add', 'edit', 'delete'] : undefined,
});

export default {
    title: 'TableRowActionsFeatureComponent',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                provideHttpClient(),
                provideHttpClientTesting(),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
            ],
        }),
        moduleMetadata({
            imports: [TableModule, DefaultContextSerializationModule],
        }),
    ],
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
            rowActions: {
                enabled: true, // This will enable feature via config
                actions: [
                    { id: '1234', title: '123' },
                    { id: '2345', title: '234' },
                    { id: 'add', title: 'Add' },
                    { id: 'edit', title: 'Edit' },
                    { id: 'delete', title: 'Delete' },
                ],
                click: '1234',
                availableActionsPath: 'availableActions',
            },
        },
    },
} as Meta;

export const viaHtml = (args) => ({
    props: {
        ...args,
        events: {
            table: (event: TableActionTriggeredEvent) => console.log('actionTriggered', event),
        },
    },
    moduleMetadata: { imports: [TableRowActionsFeatureModule] },
    template: `
    <spy-table [config]='config' [events]='events'>
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
});

export const viaConfig = (args) => ({
    props: {
        ...args,
        events: {
            table: (event: TableActionTriggeredEvent) => console.log('actionTriggered', event),
        },
    },
    applicationConfig: {
        providers: [
            importProvidersFrom(
                TableModule.withFeatures({
                    rowActions: () =>
                        import('./table-row-actions-feature.module').then((m) => m.TableRowActionsFeatureModule),
                }),
            ),
        ],
    },
    template: `
    <spy-table [config]='config' [events]='events'>
  `,
});
