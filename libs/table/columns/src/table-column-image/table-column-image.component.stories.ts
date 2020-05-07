import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { object } from '@storybook/addon-knobs';
import { IStory } from '@storybook/angular';
import { TableColumnImageComponent } from './table-column-image.component';
import { TableColumnImageModule } from './table-column-image.module';
import { ContextModule } from '@spryker/utils';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';

export default {
  title: 'TableColumnImageComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'https://images.icecat.biz/img/norm/medium/25904006-8438.jpg',
  col3: 'https://images.icecat.biz/img/gallery_mediums/30663302_6177.jpg',
});

export const withFeatures = (): IStory => ({
  moduleMetadata: {
    imports: [TableColumnImageModule],
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
      MockHttpModule,
      TableColumnImageModule,
      TableModule.forRoot(),
      TableModule.withColumnComponents({
        image: TableColumnImageComponent,
      }),
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
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
  props: {
    config: {
      dataUrl: '/data-request',
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
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});
