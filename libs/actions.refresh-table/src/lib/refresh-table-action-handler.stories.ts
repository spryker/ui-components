import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { RefreshTableActionHandlerService } from './refresh-table-action-handler.service';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export default {
    title: 'RefreshTableActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        'refresh-table': RefreshTableActionHandlerService,
                    }),
                ),
                importProvidersFrom(TableModule.forRoot()),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
            ],
        }),
        moduleMetadata({
            imports: [TableRowActionsFeatureModule, TableModule, DefaultContextSerializationModule],
        }),
    ],
    parameters: {
        controls: {
            include: ['config'],
        },
    },
} as Meta;

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export const primary = (args) => ({
    props: args,
    template: `
    <h1 style="font: bold 30px Arial; padding: 15px"> Click on the table row to refresh the table </h1>

    <spy-table [config]="config">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
});
primary.args = {
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
            enabled: true,
            actions: [
                {
                    id: 'id-refresh-table',
                    title: 'Refresh table',
                    type: 'refresh-table',
                },
            ],
            click: 'id-refresh-table',
        },
    },
};
//ToDo: change to readonly after release https://github.com/storybookjs/storybook/issues/14048
primary.argTypes = {
    config: {
        table: {
            disable: true,
        },
    },
};
