import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { CheckboxModule } from '@spryker/checkbox';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableConfig, TableModule } from '@spryker/table';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { IStory } from '@storybook/angular';

import { TableFeaturesRendererTplComponent } from '../../../src/lib/table-features-renderer/table-features-renderer-tpl.component';
import { TableTotalFeatureComponent } from './table-total-feature.component';

export default {
  title: 'TableTotalFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      HttpClientTestingModule,
      MockHttpModule,
      CheckboxModule,
      TableModule.forRoot(),
    ],
    declarations: [TableTotalFeatureComponent],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent, TableFeaturesRendererTplComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-total-feature spy-table-feature></spy-table-total-feature>
    </spy-table>
  `,
  props: {
    config: {
      dataUrl: '/data-request',
      columns: [
        { id: 'col1', title: 'Column #1' },
        { id: 'col2', title: 'Column #2' },
        { id: 'col3', title: 'Column #3' },
      ],
    } as TableConfig,
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
      },
    ]),
  },
});
