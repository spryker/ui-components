import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { DatasourceModule } from '@spryker/datasource';
import { TableModule } from '@spryker/table';
import {
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';

import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { TableColumnDateComponent } from './table-column-date.component';
import { TableColumnDateModule } from './table-column-date.module';

export default {
  title: 'TableColumnDateComponent',
  component: TableColumnDateComponent,
  decorators: [withDesign],
  parameters: {
    controls: {
      include: ['config', 'context'],
      hideNoControlsWarning: true,
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
  moduleMetadata: {
    imports: [TableColumnDateModule, DefaultContextSerializationModule],
  },
});
primary.args = {
  config: {
    date: '${value}',
    format: 'mediumDate',
  },
  context: {
    value: new Date('2020-01-01T17:25:00'),
  },
};

export const withTable = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnDateModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        date: TableColumnDateComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
      } as any),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableColumnDateComponent],
        multi: true,
      },
    ],
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
