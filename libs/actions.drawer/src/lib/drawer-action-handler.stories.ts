import { Component, importProvidersFrom, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { DatasourceModule } from '@spryker/datasource';
import { DrawerModule, DrawerContainerProxyComponent } from '@spryker/drawer';
import { TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import { MockTableDatasourceConfig, MockTableDatasourceService, TableDataMockGenerator } from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { DrawerActionHandlerService } from './drawer-action-handler.service';
import { DrawerActionModule } from './drawer-action.module';

@Component({
    standalone: false,
    selector: 'spy-simple-component',
    template: `
        <div>
            Simple Component #{{ randomValue }} <br />
            Projected input value - {{ test }}
        </div>
    `,
})
class SimpleComponent {
    @Input() test?: string;

    randomValue = Math.floor(Math.random() * 100);
}

export default {
    title: 'DrawerActionHandlerService',
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),
                importProvidersFrom(
                    ActionsModule.withActions({
                        drawer: DrawerActionHandlerService,
                    }),
                ),
                importProvidersFrom(
                    DrawerActionModule.withComponents({
                        simple_component: SimpleComponent,
                    }),
                ),
            ],
        }),
        moduleMetadata({
            imports: [DrawerModule, ButtonActionModule],
            declarations: [SimpleComponent],
            entryComponents: [DrawerContainerProxyComponent, SimpleComponent],
        }),
    ],
    parameters: {
        controls: {
            include: ['action', 'config'],
        },
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/3Pv69U4zT7FJ9sllzSRMyE/BO-Components?node-id=2082%3A8987',
            allowFullscreen: true,
        },
    },
} as Meta;

export const primary = (args) => ({
    props: args,
    template: `
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Open drawer Via Service
    </spy-button-action>
    <br />
    <br />
    <br />
    <spy-button-action
      [action]="action"
      variant="primary"
      size="lg"
    >
      Open another drawer Via Service
    </spy-button-action>
  `,
});
primary.args = {
    action: {
        type: 'drawer',
        component: 'simple_component',
        options: {
            inputs: {
                test: 'input value from config',
            },
        },
    },
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
    col1: `col1 #${i}`,
    col2: 'col2',
    col3: 'col3',
});

export const withTable = (args) => ({
    props: args,
    applicationConfig: {
        providers: [
            importProvidersFrom(
                DatasourceModule.withDatasources({
                    'mock-data': MockTableDatasourceService,
                } as any),
            ),
            importProvidersFrom(TableModule.forRoot()),
        ],
    },
    moduleMetadata: {
        imports: [TableRowActionsFeatureModule, TableModule, DefaultContextSerializationModule],
    },
    template: `
    <h1 style="font: bold 30px Arial; padding: 15px"> Click on the table row to open drawer </h1>

    <spy-table [config]="config">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
});
withTable.args = {
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
                    id: 'drawer',
                    title: 'Open Drawer',
                    type: 'drawer',
                    component: 'simple_component',
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
withTable.argTypes = {
    config: {
        table: {
            disable: true,
        },
    },
};
