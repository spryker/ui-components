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

import { TableTotalFeatureModule } from '../table-total-feature';
import { TableSelectionChangeEvent } from './table-selectable-feature.component';
import { TableSelectableFeatureModule } from './table-selectable-feature.module';

export default {
  title: 'TableSelectableFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSelectableStory(
  `
    <spy-table [config]="config" [events]="{selectable: logSelectionChange}" [mockHttp]="mockHttp">
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
  [TableSelectableFeatureModule],
);

export const viaConfig = getSelectableStory(
  `
    <spy-table [config]="config" [events]="{selectable: logSelectionChange}" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      selectable: () =>
        import('./table-selectable-feature.module').then(
          m => m.TableSelectableFeatureModule,
        ),
    }),
  ],
);

export const withTotalFeature = getSelectableStory(
  `
    <spy-table [config]="config" [events]="{selectable: logSelectionChange}" [mockHttp]="mockHttp">
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
      <spy-table-total-feature spy-table-feature></spy-table-total-feature>
    </spy-table>
  `,
  [TableSelectableFeatureModule, TableTotalFeatureModule],
);

function getSelectableStory(
  template: string,
  extraNgModules: any[] = [],
): () => IStory {
  return () => ({
    moduleMetadata: {
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MockHttpModule,
        CheckboxModule,
        TableModule.forRoot(),
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
    props: {
      config: {
        dataUrl: '/data-request',
        columns: [
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        selectable: true, // This will enable feature via config
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
}
