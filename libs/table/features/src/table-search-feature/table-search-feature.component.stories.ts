import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { IStory } from '@storybook/angular';
import { TableModule } from '@spryker/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableSearchFeatureModule } from '@spryker/table/features';
import {
  generateMockTableDataFor,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';

export default {
  title: 'TableSearchFeatureComponent',
};

const tableDataGenerator: TableDataMockGenerator = i => ({
  col1: `col1 #${i}`,
  col2: 'col2',
  col3: 'col3',
});

export const viaHtml = getSearchStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
      <spy-table-search-feature spy-table-feature></spy-table-search-feature>
    </spy-table>
  `,
  [TableSearchFeatureModule],
);

export const viaConfig = getSearchStory(
  `
    <spy-table [config]="config" [mockHttp]="mockHttp">
  `,
  [
    TableModule.withFeatures({
      search: () =>
        import('./table-search-feature.module').then(
          m => m.TableSearchFeatureModule,
        ),
    }),
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
        search: {
          enabled: true, // This will enable feature via config
          placeholder: 'Placeholder',
        },
      },
      mockHttp: setMockHttp([
        {
          url: '/data-request',
          dataFn: req => generateMockTableDataFor(req, tableDataGenerator),
        },
      ]),
    },
  });
}
