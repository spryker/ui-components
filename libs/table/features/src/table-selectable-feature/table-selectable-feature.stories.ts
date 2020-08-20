import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { CheckboxModule } from '@spryker/checkbox';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { TableModule } from '@spryker/table';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { IStory } from '@storybook/angular';

import { TableSelectionChangeEvent } from './table-selectable-feature.component';
import { TableSelectableFeatureModule } from './table-selectable-feature.module';
import { TableDatasourceHttpService } from '../../../datasources/src/table.datasource.http';
import { DefaultContextSerializationModule } from '@spryker/utils';

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
    <spy-table [config]="config" [events]="{itemSelection: logSelectionChange}" [mockHttp]="mockHttp">
      <spy-table-selectable-feature spy-table-feature></spy-table-selectable-feature>
    </spy-table>
  `,
  [TableSelectableFeatureModule],
);

export const viaConfig = getSelectableStory(
  `
    <spy-table [config]="config" [events]="{itemSelection: logSelectionChange}" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      itemSelection: () =>
        import('./table-selectable-feature.module').then(
          m => m.TableSelectableFeatureModule,
        ),
    }),
  ],
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
        TableModule.withDatasourceTypes({
          http: TableDatasourceHttpService,
        }),
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
    props: {
      config: {
        dataSource: {
          type: 'http',
          url: '/data-request',
        },
        columns: [
          { id: 'col1', title: 'Column #1' },
          { id: 'col2', title: 'Column #2' },
          { id: 'col3', title: 'Column #3' },
        ],
        itemSelection: {
          enabled: true, // This will enable feature via config
        },
      },
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
