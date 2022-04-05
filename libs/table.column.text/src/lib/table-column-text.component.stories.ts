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

import { TableColumnTextComponent } from './table-column-text.component';
import { TableColumnTextModule } from './table-column-text.module';

export default {
  title: 'TableColumnTextComponent',
  component: TableColumnTextComponent,
  decorators: [withDesign],
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
  moduleMetadata: {
    imports: [TableColumnTextModule, DefaultContextSerializationModule],
  },
});

export const withTable = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnTextModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnTextComponent],
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
