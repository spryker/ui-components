import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsModule } from '@spryker/actions';
import { DrawerActionHandlerService } from '@spryker/actions.drawer';
import { ButtonActionModule } from '@spryker/button.action';
import { DatasourceModule } from '@spryker/datasource';
import { DrawerModule } from '@spryker/drawer';
import { TableModule } from '@spryker/table';
import { TableRowActionsFeatureModule } from '@spryker/table.feature.row-actions';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { RefreshParentTableActionHandlerService } from './refresh-parent-table-action-handler.service';
import { DrawerContainerProxyComponent } from '../../../drawer/src/lib/drawer-container/drawer-container-proxy.component';

export default {
  title: 'RefreshParentTableActionHandlerService',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

const tableConfig = {
  dataSource: {
    type: 'mock-data',
    dataGenerator: tableDataGenerator,
  } as MockTableDatasourceConfig,
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
      <h1 style="font: bold 30px Arial; padding: 15px">
        Click on the table row to refresh the parent table
      </h1>

      <spy-table [config]="config">
        <spy-table-row-actions-feature
          spy-table-feature
        ></spy-table-row-actions-feature>
      </spy-table>
    </div>
  `,
})
class SimpleComponent {
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

export const primary = () => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      DrawerModule,
      ActionsModule.withActions({
        drawer: DrawerActionHandlerService,
        'refresh-parent-table': RefreshParentTableActionHandlerService,
      }),
      TableRowActionsFeatureModule,
      HttpClientTestingModule,
      ButtonActionModule,
      TableModule.forRoot(),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      }),
      DefaultContextSerializationModule,
    ],
    declarations: [SimpleComponent],
    entryComponents: [SimpleComponent, DrawerContainerProxyComponent],
  },
  template: `
    <h1 style="font: bold 30px Arial; padding: 15px"> Click on the table row to open drawer </h1>

    <spy-table [config]="config">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
  props: {
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
  },
});
