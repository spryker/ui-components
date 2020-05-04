import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@spryker/table';
import { TableFiltersFeatureModule } from './table-filters-feature.module';
import {
  TableFilterSelectComponent,
  TableFilterSelectModule,
} from '@spryker/table/filters';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { generateMockTableDataFor, TableDataMockGenerator } from '@spryker/table/testing';
import { LayoutFlatHostComponent } from '@orchestrator/layout';

export default {
  title: 'TableFiltersFeature',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSearchStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp" (actionTriggered)="logActions($event)">
      <spy-table-filters-feature spy-table-feature></spy-table-filters-feature>
    </spy-table>
  `,
  [
    TableFiltersFeatureModule,
    TableFiltersFeatureModule.withFilterComponents({
      select: TableFilterSelectComponent,
      select2: TableFilterSelectComponent,
    } as any),
    TableFilterSelectModule,
  ],
);

function getSearchStory(
  template: string,
  extraNgModules: any[] = [],
): () => IStory {
  return () => ({
    moduleMetadata: {
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MockHttpModule,
        TableModule.forRoot(),
        ...extraNgModules,
      ],
      providers: [
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: [LayoutFlatHostComponent, TableFilterSelectComponent],
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
        // filters: true,
        filters: [
          {
            id: 'offers',
            title: 'Has Offers',
            type: 'select',
            typeOptions: {
              multiselect: false,
              values: [
                { value: 1, title: 'Yes' },
                { value: 0, title: 'No' },
              ],
            },
          },
          {
            id: 'status',
            title: 'Product Status',
            type: 'select',
            typeOptions: {
              multiselect: false,
              values: [
                { value: 1, title: 'Active' },
                { value: 0, title: 'Inactive' },
              ],
            },
          },
        ],
      },
      logActions: console.log,
      mockHttp: setMockHttp([
        {
          url: '/data-request',
          dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
        },
      ]),
    },
  });
};
