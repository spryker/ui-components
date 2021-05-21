import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { IStory } from '@storybook/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  generateMockTableDataFor,
  MockTableDatasourceConfig,
  MockTableDatasourceService,
  TableDataMockGenerator,
} from '@spryker/table/testing';
import {
  ContextModule,
  DefaultContextSerializationModule,
} from '@spryker/utils';
import { TableModule } from '@spryker/table';
import { DatasourceModule, Datasource } from '@spryker/datasource';
import {
  TableColumnSelectComponent,
  TableColumnSelectModule,
} from '@spryker/table.column.select';
import {
  TableColumnTextComponent,
  TableColumnTextModule,
} from '@spryker/table.column.text';
import {
  DatasourceInlineModule,
  DatasourceInlineService,
} from '@spryker/datasource.inline';
import { DatasourceHttpService } from '@spryker/datasource.http';
import {
  TableColumnAutocompleteComponent,
  TableColumnAutocompleteModule,
} from '@spryker/table.column.autocomplete';
import { TableDatasourceDependableService } from '@spryker/table.feature.editable';
import { NotificationModule } from '@spryker/notification';
import { LocaleModule } from '@spryker/locale';
import { EN_LOCALE, EnLocaleModule } from '@spryker/locale/locales/en';
import { MockHttpModule, setMockHttp } from '@spryker/internal-utils';
import { LayoutFlatHostComponent } from '@orchestrator/layout';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';
import { TableColumnDynamicModule } from './table-column-dynamic.module';
import { of, Observable, timer } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { CacheService } from '@spryker/cache';
import { DataSerializerService } from '@spryker/data-serializer';
import {
  ContextService,
  DiEncodingCodecToken,
  InjectionTokenType,
} from '@spryker/utils';
import { switchMap, switchMapTo } from 'rxjs/operators';

export default {
  title: 'TableColumnDynamicComponent',
};

@Injectable({
  providedIn: 'root',
})
class MockDatasourceHttpService implements Datasource {
  constructor(
    private http: HttpClient,
    private contextService: ContextService,
  ) {}

  resolve(
    injector: Injector,
    config: { type: 'http'; url: string },
    context?: unknown,
  ): Observable<unknown> {
    config = { ...config };
    config.url = this.contextService.interpolate(config.url, context as any);

    if (!config.url) {
      return of(void 0);
    }

    return timer(2000).pipe(switchMapTo(this.http.request('GET', config.url)));
  }
}

const tableDataGenerator: TableDataMockGenerator = (i) => ({
  col1: `${i}`,
  col2: `Option ${i}`,
  col3: `col3 #${i}`,
});

export const primary = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      } as any),
      TableModule.withColumnComponents({
        text: TableColumnTextComponent,
        select: TableColumnSelectComponent,
        dynamic: TableColumnDynamicComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        inline: DatasourceInlineService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      DatasourceInlineModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
      TableColumnTextModule,
      TableColumnSelectModule,
      TableColumnDynamicModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnTextComponent,
          TableColumnSelectComponent,
          TableColumnDynamicComponent,
        ],
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
        { id: 'col1', sortable: true, title: 'Column #1' },
        {
          id: 'col2',
          title: 'Column #2',
          type: 'select',
          typeOptions: {
            options: [
              {
                title: 'Option 1',
                value: 'Option 1',
              },
              {
                title: 'Option 2',
                value: 'Option 2',
                isDisabled: true,
              },
              {
                title: 'Option 3',
                value: 'Option 3',
              },
            ],
            placeholder: '123',
          },
        },
        {
          id: 'col3',
          title: 'Column #3',
          type: 'dynamic',
          typeOptions: {
            datasource: {
              type: 'inline',
              data: {
                type: 'select',
                typeOptions: {
                  options: [
                    {
                      title: 'Option dynamic 1',
                      value: 'Option dynamic 1',
                    },
                    {
                      title: 'Option dynamic 2',
                      value: 'Option dynamic 2',
                    },
                  ],
                },
              },
            },
          },
        },
      ],
      editable: {
        columns: [
          {
            id: 'col2',
            type: 'select',
            typeOptions: {
              options: ['Option 1', 'Option 2'],
            },
          },
          {
            id: 'col3',
            type: 'dynamic',
            typeOptions: {
              datasource: {
                type: 'inline',
                data: {
                  type: 'select',
                  typeOptions: {
                    options: [
                      {
                        title: 'Option dynamic 1',
                        value: 'Option dynamic 1',
                      },
                      {
                        title: 'Option dynamic 2',
                        value: 'Option dynamic 2',
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
        create: {
          addButton: {},
          cancelButton: {},
        },
      },
    },
  },
});

export const withDependentColumns = (): IStory => ({
  moduleMetadata: {
    imports: [
      HttpClientTestingModule,
      ContextModule,
      MockHttpModule,
      TableColumnAutocompleteModule,
      TableColumnSelectModule,
      TableColumnDynamicModule,
      TableModule.forRoot(),
      TableModule.withFeatures({
        editable: () =>
          import('@spryker/table.feature.editable').then(
            (m) => m.TableEditableFeatureModule,
          ),
      }),
      TableModule.withColumnComponents({
        autocomplete: TableColumnAutocompleteComponent,
        select: TableColumnSelectComponent,
        dynamic: TableColumnDynamicComponent,
      } as any),
      DatasourceModule.withDatasources({
        'mock-data': MockTableDatasourceService,
        inline: DatasourceInlineService,
        dependable: TableDatasourceDependableService,
        http: MockDatasourceHttpService,
      }),
      DefaultContextSerializationModule,
      BrowserAnimationsModule,
      NotificationModule.forRoot(),
      LocaleModule.forRoot({ defaultLocale: EN_LOCALE }),
      EnLocaleModule,
    ],
    providers: [
      {
        provide: ANALYZE_FOR_ENTRY_COMPONENTS,
        useValue: [
          LayoutFlatHostComponent,
          TableColumnAutocompleteComponent,
          TableColumnSelectComponent,
          TableColumnDynamicComponent,
        ],
        multi: true,
      },
    ],
  },
  template: `
    <spy-table [config]="config" [mockHttp]="mockHttp"></spy-table>
  `,
  props: {
    config: {
      dataSource: {
        type: 'mock-data',
        dataGenerator: tableDataGenerator,
      } as MockTableDatasourceConfig,
      columns: [
        {
          id: 'col1',
          sortable: true,
          title: 'Column #1',
        },
        {
          id: 'col2',
          title: 'Column #2',
        },
        {
          id: 'col3',
          title: 'Column #3',
        },
      ],
      editable: {
        columns: [
          {
            id: 'col1',
            type: 'select',
            typeOptions: {
              options: [
                {
                  title: 'series',
                  value: 'series',
                },
                {
                  title: 'width',
                  value: 'width',
                },
              ],
            },
          },
          {
            id: 'col2',
            type: 'dynamic',
            typeOptions: {
              datasource: {
                type: 'dependable',
                dependsOn: 'col1',
                datasource: {
                  type: 'http',
                  url: '${row.col1}',
                },
              },
            },
          },
          {
            id: 'col3',
            type: 'dynamic',
            typeOptions: {
              datasource: {
                type: 'dependable',
                dependsOn: 'col1',
                datasource: {
                  type: 'http',
                  url: '${row.col1}',
                },
              },
            },
          },
        ],
        create: {
          addButton: {},
          cancelButton: {},
        },
        update: { url: '/update-cell' },
      },
    },
    mockHttp: setMockHttp([
      {
        url: '/data-request',
        dataFn: (req) => generateMockTableDataFor(req, tableDataGenerator),
      },
      {
        url: '/update-cell',
        data: {},
      },
      {
        url: 'series',
        data: {
          type: 'autocomplete',
          typeOptions: {
            options: [
              {
                value: 'Dependable Option 1',
                title: 'Dependable Option 1',
              },
              {
                value: 'Dependable Option 2',
                title: 'Dependable Option 2',
              },
              {
                value: 'Dependable Option 3',
                title: 'Dependable Option 3',
              },
            ],
          },
        },
      },
      {
        url: 'width',
        data: {
          type: 'select',
          typeOptions: {
            options: [
              {
                value: 'Dependable Option 1',
                title: 'Dependable Option 1',
              },
              {
                value: 'Dependable Option 2',
                title: 'Dependable Option 2',
              },
              {
                value: 'Dependable Option 3',
                title: 'Dependable Option 3',
              },
            ],
          },
        },
      },
    ]),
  },
});
