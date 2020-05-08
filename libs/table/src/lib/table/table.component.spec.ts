// tslint:disable: no-non-null-assertion
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { PluckModule } from '@spryker/utils';

import { CoreTableComponent } from './table.component';
import { TableConfig, TableColumns } from './table';
import { TableFeaturesRendererDirective } from '../table-features-renderer/table-features-renderer.directive';
import { TableRenderFeatureDirective } from '../table-features-renderer/table-render-feature.directive';
import { TableFeaturesRegistryToken } from '@spryker/table';
import { TableFeaturesRendererComponent } from '../table-features-renderer/table-features-renderer.component';
import { of } from 'rxjs';

const mockDataUrl = 'https://test-data-url.com';
const mockColUrl = 'https://test-col-url.com';
const mockCols: TableColumns = [
  {
    id: 'name',
    title: 'name',
    sortable: true,
    width: '40%',
  },
  {
    id: 'sku',
    title: 'sku',
    sortable: true,
  },
  {
    id: 'id3',
    title: 'id3',
    sortable: true,
  },
];

const mockData = {
  data: [
    {
      name: 'tesst',
      sku: 'tesst2',
      id3: 'tesst3',
      sku3: '124124',
    },
    {
      name: 'tesst1',
      sku: 'tesst22',
      id3: 'tesst34',
      sku3: 'idasaasf',
    },
    {
      name: 'tess2t',
      sku: 'asfasffas',
      id3: 'tessst3',
      sku3: '111idasaasf',
    },
  ],
  total: 5,
  pageSize: 10,
  page: 1,
};
const mockConfig: TableConfig = {
  dataUrl: mockDataUrl,
  columnsUrl: mockColUrl,
  mockFeature: {
    enabled: true,
  },
};
const mockConfigCols: TableConfig = {
  dataUrl: mockDataUrl,
  columns: mockCols,
};

describe('TableComponent', () => {
  let httpTestingController: HttpTestingController;

  const { testModule, createComponent } = getTestingForComponent(
    CoreTableComponent,
    {
      ngModule: {
        imports: [HttpClientTestingModule, PluckModule],
        declarations: [
          TableFeaturesRendererComponent,
          TableFeaturesRendererDirective,
          TableRenderFeatureDirective,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
    });
  });

  describe('Template structure', () => {
    it('must render `nz-table`', async () => {
      const host = await createComponent({ config: mockConfig }, true);
      const tableElem = host.queryCss('nz-table');

      expect(tableElem).toBeTruthy();
    });

    it('must render `thead` with input `nzSingleSort` must be `true`', async () => {
      const host = await createComponent({ config: mockConfig }, true);
      const tableHeadElem = host.queryCss('thead');

      expect(tableHeadElem).toBeTruthy();
      expect(tableHeadElem!.attributes.nzSingleSort).toBe('true');
    });

    describe('spy-table-features-renderer', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [testModule],
          providers: [
            {
              provide: TableFeaturesRegistryToken,
              useValue: {
                mockFeature: () =>
                  import('../../../testing/src/mock-feature-component').then(
                    m => m.MockFeatureModule,
                  ),
              },
              multi: true,
            },
          ],
        });
      });

      it('must render features in the appropriate blocks', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfig }, true);
        host.component.tableData$ = of([{}]);

        tick();
        host.detectChanges();
        tick();
        host.detectChanges();

        const topFeaturesElem = host.queryCss(
          '.ant-table-features--top .top-feature',
        );
        const beforeTableFeaturesElem = host.queryCss(
          '.ant-table-features--before-table .before-table-feature',
        );
        const afterTableFeaturesElem = host.queryCss(
          '.ant-table-features--after-table .after-table-feature',
        );
        const paginationFeaturesElem = host.queryCss(
          '.ant-table-features--pagination .pagination-feature',
        );
        const bottomFeaturesElem = host.queryCss(
          '.ant-table-features--bottom .bottom-feature',
        );
        const hiddenFeaturesElem = host.queryCss(
          '.ant-table-features--hidden .hidden-feature',
        );
        const headerExtFeaturesElem = host.queryCss(
          'thead th:last-child .header-ext-header-feature',
        );
        const beforeColsHeaderFeaturesElem = host.queryCss(
          'thead th:first-child .before-cols-header-feature',
        );
        const afterColsHeaderFeaturesElem = host.queryCss(
          'thead th:nth-child(2) .after-cols-header-feature',
        );
        const beforeColsFeaturesElem = host.queryCss(
          'tbody tr:first-child td:first-child .before-cols-feature',
        );
        const afterColsFeaturesElem = host.queryCss(
          'tbody tr:first-child td:nth-child(2) .after-cols-feature',
        );

        expect(topFeaturesElem).toBeTruthy();
        expect(beforeTableFeaturesElem).toBeTruthy();
        expect(afterTableFeaturesElem).toBeTruthy();
        expect(paginationFeaturesElem).toBeTruthy();
        expect(bottomFeaturesElem).toBeTruthy();
        expect(hiddenFeaturesElem).toBeTruthy();
        expect(headerExtFeaturesElem).toBeTruthy();
        expect(beforeColsHeaderFeaturesElem).toBeTruthy();
        expect(afterColsHeaderFeaturesElem).toBeTruthy();
        expect(beforeColsFeaturesElem).toBeTruthy();
        expect(afterColsFeaturesElem).toBeTruthy();
      }));
    });
  });

  describe('@Input(config)', () => {
    beforeEach(() => {
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    describe('columnsUrl dataUrl columns', () => {
      it('returned columns$ Observable should match the right data with `columnsUrl key`', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const callback = jest.fn();
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        tick();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        expect(columnsRes.request.method).toBe('GET');

        columnsRes.flush(mockCols);
        host.detectChanges();
        host.component.columns$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockCols);
      }));

      it('returned columns$ Observable should match the right data with `columns` key', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfigCols }, true);
        const callback = jest.fn();
        tick();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        host.detectChanges();
        host.component.columns$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockCols);
      }));

      it('returned data$ Observable should match the right data', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const callback = jest.fn();
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        tick();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        expect(dataRes.request.method).toBe('GET');

        dataRes.flush(mockData);
        host.detectChanges();
        host.component.data$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockData);
      }));

      it('prop data$ must be mapped into tbody and render spy-table-column-renderer at each td', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        tick();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        dataRes.flush(mockData);
        columnsRes.flush(mockCols);
        host.detectChanges();

        const columnElement = host.queryCss(
          'tr:first-child td:first-child spy-table-column-renderer',
        );
        const tdElements = host.fixture.debugElement.queryAll(By.css('tr th'));

        expect(tdElements.length).toBe(mockData.data.length);
        expect(columnElement).toBeTruthy();
        expect(columnElement!.properties.config).toBe(mockCols[0]);
        expect(columnElement!.properties.data).toBe(mockData.data[0]);
        expect(columnElement!.properties.template).toBe(undefined);
      }));

      it('prop columns$ must be mapped into thead and create with tr and each th of the table', fakeAsync(async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        tick();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        columnsRes.flush(mockCols);
        host.detectChanges();

        const thElements = host.fixture.debugElement.queryAll(By.css('tr th'));

        expect(thElements.length).toBe(mockCols.length);
        expect(thElements[0].properties.nzShowSort).toBe(mockCols[0].sortable);
        expect(thElements[0].properties.nzWidth).toBe(mockCols[0].width);
        expect(thElements[0].properties.nzSortKey).toBe(mockCols[0].id);
        expect(thElements[0].nativeElement.textContent).toMatch(
          mockCols[0].title,
        );
      }));
    });
  });
});
