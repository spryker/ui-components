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

import {
  TableSelectableFeatureComponent,
  TableSelectionChangeEvent,
} from './table-selectable-feature.component';

export default {
  title: 'TableSelectableFeatureComponent',
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
    declarations: [TableSelectableFeatureComponent],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [LayoutFlatHostComponent],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-selectable-feature
        spy-table-feature
        (selectionChange)="logSelectionChange($event)"
      ></spy-table-selectable-feature>
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
    logSelectionChange: (event: TableSelectionChangeEvent) =>
      console.log('SelectionChange', event),
  },
});
