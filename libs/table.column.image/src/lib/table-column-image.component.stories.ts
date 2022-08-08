import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { Meta } from '@storybook/angular';
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

import { TableColumnImageComponent } from './table-column-image.component';
import { TableColumnImageModule } from './table-column-image.module';

export default {
  title: 'TableColumnImageComponent',
  component: TableColumnImageComponent,
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
  col1: `col1 #${i}`,
  col2: 'https://images.icecat.biz/img/norm/medium/25904006-8438.jpg',
  col3: 'https://images.icecat.biz/img/gallery_mediums/30663302_6177.jpg',
});

export const primary = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [TableColumnImageModule, DefaultContextSerializationModule],
  },
});
primary.args = {
  config: {
    src: '${value}',
    alt: 'Value for testing',
  },
  context: {
    value: 'https://images.icecat.biz/img/norm/medium/25904006-8438.jpg',
  },
};

export const withTable = (args) => ({
  props: args,
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableColumnImageModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        image: TableColumnImageComponent,
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
        useValue: [LayoutFlatHostComponent, TableColumnImageComponent],
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
        type: 'image',
        typeOptions: {
          src: '${value}',
          alt: 'Value for testing',
        },
      },
      {
        id: 'col3',
        title: 'Column #3',
        type: 'image',
        typeOptions: {
          src: '${value}',
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
