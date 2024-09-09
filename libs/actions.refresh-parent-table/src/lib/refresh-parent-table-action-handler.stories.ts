import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, importProvidersFrom, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { DrawerActionHandlerService } from '@spryker/actions.drawer';
import { ButtonActionModule } from '@spryker/button.action';
import { DatasourceModule } from '@spryker/datasource';
import { DrawerModule, DrawerContainerProxyComponent } from '@spryker/drawer';
import { TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { RefreshParentTableActionHandlerService } from './refresh-parent-table-action-handler.service';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

const tableConfig = {
    dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
    } as unknown as MockTableDatasourceConfig,
    columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
    ],
};

@Component({
    selector: 'spy-simple-component',
    template: `
        <div>
            <h1 style="font: bold 30px Arial; padding: 15px">Click on the table row to refresh the parent table</h1>

            <spy-table [config]="config">
                <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
            </spy-table>
        </div>
    `,
})
class SimpleComponent {
    @Input() test?: string;

    config = {
        ...tableConfig,
        rowActions: {
            enabled: true,
            actions: [
                {
                    id: 'refresh-parent-table',
                    title: 'Refresh Parent Table',
                    type: 'refresh-parent-table',
                },
            ],
            click: 'refresh-parent-table',
        },
    };
}

export default {
    title: 'RefreshParentTableActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        drawer: DrawerActionHandlerService,
                        'refresh-parent-table': RefreshParentTableActionHandlerService,
                    }),
                ),
                importProvidersFrom(
                    DatasourceModule.withDatasources({
                        'mock-data': MockTableDatasourceService,
                    } as any),
                ),
                importProvidersFrom(TableModule.forRoot()),
            ],
        }),
        moduleMetadata({
            imports: [
                DrawerModule,
                TableRowActionsFeatureModule,
                HttpClientTestingModule,
                ButtonActionModule,
                TableModule,
                DefaultContextSerializationModule,
            ],
            declarations: [SimpleComponent],
            entryComponents: [SimpleComponent, DrawerContainerProxyComponent],
        }),
    ],
    parameters: {
        controls: {
            include: ['config'],
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <h1 style="font: bold 30px Arial; padding: 15px"> Click on the table row to open drawer </h1>

    <spy-table [config]="config">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
});
primary.args = {
    config: {
        ...tableConfig,
        rowActions: {
            enabled: true,
            actions: [
                {
                    id: 'drawer',
                    title: 'Open Drawer',
                    type: 'drawer',
                    component: SimpleComponent,
                    options: {
                        inputs: {
                            test: 'input value from config',
                        },
                    },
                },
            ],
            click: 'drawer',
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
