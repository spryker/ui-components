import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { DatasourceModule } from '@spryker/datasource';
import { TableActionTriggeredEvent, TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { DefaultContextSerializationModule } from '@spryker/utils';

import { TableRowActionsFeatureModule } from './table-row-actions-feature.module';

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
  availableActions: i % 2 === 0 ? ['add', 'edit', 'delete'] : undefined,
});

export default {
  title: 'TableRowActionsFeatureComponent',
  decorators: [withDesign],
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

export const viaHtml = getRowActionsStory(
  `
    <spy-table [config]="config" [events]="{rowActions: logActionTriggered}">
      <spy-table-row-actions-feature spy-table-feature></spy-table-row-actions-feature>
    </spy-table>
  `,
  [TableRowActionsFeatureModule],
);

export const viaConfig = getRowActionsStory(
  `
    <spy-table [config]="config" [events]="{rowActions: logActionTriggered}">
  `,
  [
    TableModule.withFeatures({
      rowActions: () =>
        import('./table-row-actions-feature.module').then(
          (m) => m.TableRowActionsFeatureModule,
        ),
    }),
  ],
);

function getRowActionsStory(
  template: string,
  extraNgModules: any[] = [],
): (args) => IStory {
  return (args) => ({
    props: {
      ...args,
      logActionTriggered: (event: TableActionTriggeredEvent) =>
        console.log('actionTriggered', event),
    },
    moduleMetadata: {
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TableModule.forRoot(),
        DatasourceModule.withDatasources({
          'mock-data': MockTableDatasourceService,
        } as any),
        DefaultContextSerializationModule,
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent],
          multi: true,
        },
      ],
    },
    template,
  });
}
