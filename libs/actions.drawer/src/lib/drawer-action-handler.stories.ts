import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { ButtonActionModule } from '@spryker/button.action';
import { DatasourceModule } from '@spryker/datasource';
import { DrawerModule, DrawerContainerProxyComponent } from '@spryker/drawer';
import { TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';
import { object } from '@storybook/addon-knobs';

import { DrawerActionHandlerService } from './drawer-action-handler.service';
import { DrawerActionModule } from './drawer-action.module';

export default {
  title: 'DrawerActionHandlerService',
};

@Component({
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

export const primary = () => ({
  moduleMetadata: {
    imports: [
      DrawerModule,
      BrowserAnimationsModule,
      ActionsModule.withActions({
        drawer: DrawerActionHandlerService,
      }),
      DrawerActionModule.withComponents({
        simple_component: SimpleComponent,
      }),
      ButtonActionModule,
    ],
    declarations: [SimpleComponent],
    entryComponents: [DrawerContainerProxyComponent, SimpleComponent],
  },
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
  props: {
    action: object('action', {
      type: 'drawer',
      component: 'simple_component',
      options: {
        inputs: {
          test: 'input value from config',
        },
      },
    }),
  },
});

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const withTable = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      DrawerModule,
      ActionsModule.withActions({
        drawer: DrawerActionHandlerService,
      }),
      TableRowActionsFeatureModule,
      ButtonActionModule,
      TableModule.forRoot(),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      } as any),
      DefaultContextSerializationModule,
      DrawerActionModule.withComponents({
        simple_component: SimpleComponent,
      }),
    ],
    declarations: [SimpleComponent],
    entryComponents: [DrawerContainerProxyComponent, SimpleComponent],
  },
  template: `
    <h1 style="font: bold 30px Arial; padding: 15px"> Click on the table row to open drawer </h1>

    <spy-table [config]="config">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
  props: {
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
  },
});
