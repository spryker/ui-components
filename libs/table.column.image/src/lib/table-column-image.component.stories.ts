import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
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
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';

import { TableColumnImageComponent } from './table-column-image.component';
import { TableColumnImageModule } from './table-column-image.module';

export default {
  title: 'TableColumnImageComponent',
};

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `col1 #${i}`,
  col2: 'https://images.icecat.biz/img/norm/medium/25904006-8438.jpg',
  col3: 'https://images.icecat.biz/img/gallery_mediums/30663302_6177.jpg',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnImageModule, DefaultContextSerializationModule],
  },
  component: TableColumnImageComponent,
  props: {
    config: object('Config', {
      src: '${value}',
    }),
    context: object('Context', {
      value: 'https://images.icecat.biz/img/norm/medium/25904006-8438.jpg',
    }),
  },
});

export const withTable = (): IStory => ({
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
      }),
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
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        { id: 'col1', sortable: true, title: 'Column #1', width: '20%' },
        {
          id: 'col2',
          title: 'Column #2',
          type: 'image',
          typeOptions: {
            src: '${value}',
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
  },
});
