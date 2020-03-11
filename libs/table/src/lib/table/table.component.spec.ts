// tslint:disable: no-non-null-assertion
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { TableComponent } from './table.component';
import { TableConfig, TableColumns } from './table';

const mockedDataUrl = 'https://test-data-url.com';
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
  size: 10,
  offset: 1,
};
const mockConfig: TableConfig = {
  dataUrl: mockedDataUrl,
  columnsUrl: mockColUrl,
};
const mockConfigCols: TableConfig = {
  dataUrl: mockedDataUrl,
  columns: mockCols,
};

describe('TableComponent', () => {
  let httpTestingController: HttpTestingController;

  const { testModule, createComponent } = getTestingForComponent(
    TableComponent,
    {
      ngModule: {
        imports: [HttpClientTestingModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [testModule] });
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
  });

  describe('@Input(config)', () => {
    beforeEach(() => {
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    describe('columnsUrl dataUrl columns', () => {
      it('returned columns$ Observable should match the right data with `columnsUrl key`', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        expect(columnsRes.request.method).toBe('GET');

        columnsRes.flush(mockCols);
        host.detectChanges();

        host.component.columns$.subscribe(cols => {
          expect(cols.length).toBe(mockCols.length);
          expect(cols[0].id).toBe(mockCols[0].id);
          expect(cols[0].title).toBe(mockCols[0].title);
          expect(cols[0].sortable).toBe(mockCols[0].sortable);
          expect(cols[0].width).toBe(mockCols[0].width);
        });
      });

      it('returned columns$ Observable should match the right data with `columns` key', async () => {
        const host = await createComponent({ config: mockConfigCols }, true);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        host.detectChanges();

        host.component.columns$.subscribe(columns => {
          expect(columns.length).toBe(mockCols.length);
          expect(columns[0].id).toBe(mockCols[0].id);
          expect(columns[0].title).toBe(mockCols[0].title);
          expect(columns[0].sortable).toBe(mockCols[0].sortable);
          expect(columns[0].width).toBe(mockCols[0].width);
        });
      });

      it('returned data$ Observable should match the right data', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        expect(dataRes.request.method).toBe('GET');

        dataRes.flush(mockData);
        host.detectChanges();

        host.component.data$.subscribe(data_ => {
          expect(data_.data.length).toBe(mockData.data.length);
          expect(data_.total).toBe(mockData.total);
          expect(data_.size).toBe(mockData.size);
          expect(data_.offset).toBe(mockData.size);
          expect(data_.data[0].name).toBe(mockData.data[0].name);
          expect(data_.data[0].sku).toBe(mockData.data[0].sku);
          expect(data_.data[0].id3).toBe(mockData.data[0].id3);
          expect(data_.data[0].sku3).toBe(mockData.data[0].sku3);
        });
      });

      it('prop data$ must be mapped into tbody and render spy-table-column-renderer at each td', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
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
      });

      it('prop columns$ must be mapped into thead and create with tr and each th of the table', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
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
      });
    });

    describe('sortable is true', () => {
      const mockSelectableConfig = { ...mockConfigCols, selectable: true };

      it('should create first `th` with `spy-checkbox` into each `tr` into `thead`', async () => {
        const host = await createComponent(
          { config: mockSelectableConfig },
          true,
        );
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        host.detectChanges();

        const checkboxElem = host.queryCss(
          'thead tr th:first-child spy-checkbox',
        );

        expect(checkboxElem).toBeTruthy();
      });

      it('should bind `allChecked` to `checked` input of `spy-checkbox``', async () => {
        const host = await createComponent({ config: mockSelectableConfig });
        const mockAllChecked = true;

        host.component.allChecked = true;
        host.detectChanges();

        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );
        const checkboxElem = host.queryCss(
          'thead tr th:first-child spy-checkbox',
        );

        expect(checkboxElem!.properties.checked).toBe(mockAllChecked);
      });

      it('should bind `isIndeterminate` to `indeterminate` input of `spy-checkbox``', async () => {
        const host = await createComponent({ config: mockSelectableConfig });
        const mockIndeterminate = true;

        host.component.isIndeterminate = true;
        host.detectChanges();

        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );
        const checkboxElem = host.queryCss(
          'thead tr th:first-child spy-checkbox',
        );

        expect(checkboxElem!.properties.indeterminate).toBe(mockIndeterminate);
      });

      it('should create first `td` with `spy-checkbox` into each tr into `tbody``', async () => {
        const host = await createComponent(
          { config: mockSelectableConfig },
          true,
        );
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        dataRes.flush(mockData);
        host.detectChanges();

        const checkboxElem = host.queryCss(
          'tbody tr td:first-child spy-checkbox',
        );

        expect(checkboxElem).toBeTruthy();
      });

      it('should bind checkedRows[RowIndex] to `checked` input of `spy-checkbox``', async () => {
        const host = await createComponent(
          { config: mockSelectableConfig },
          true,
        );
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );
        const mockChecked = true;

        dataRes.flush(mockData);
        host.component.checkedRows = {
          0: mockChecked,
        };
        host.detectChanges();

        const checkboxElem = host.queryCss(
          'tbody tr:first-child td:first-child spy-checkbox',
        );

        expect(checkboxElem!.properties.checked).toBe(mockChecked);
      });

      it('should apply class `--selected` to tr when checkedRows[RowIndex] is `truthy`', async () => {
        const host = await createComponent(
          { config: mockSelectableConfig },
          true,
        );
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );
        const mockChecked = true;

        dataRes.flush(mockData);
        host.component.checkedRows = {
          0: mockChecked,
        };
        host.detectChanges();

        const checkboxElem = host.queryCss('tbody tr:first-child');

        expect(
          checkboxElem!.nativeElement.classList.contains(
            'ant-table-row--selected',
          ),
        ).toBe(true);
      });
    });

    describe('fixHeader', () => {
      const mockHeaderConfig = { ...mockConfigCols, fixHeader: '100px' };

      it('should bind to `nzScroll` input of `nz-table` component', async () => {
        const host = await createComponent({ config: mockHeaderConfig }, true);
        const dataRes = httpTestingController.expectOne(
          `${mockedDataUrl}?page=0`,
        );

        host.detectChanges();

        const tableElem = host.queryCss('nz-table');

        expect(tableElem!.properties.nzScroll.y).toBe(
          mockHeaderConfig.fixHeader,
        );
      });
    });
  });

  describe('@Output(selectionChange)', () => {
    it('must be emitted every time when `toggleCheckedRows` is triggered', async () => {
      const host = await createComponent({ config: mockConfig }, true);

      spyOn(host.component.selectionChange, 'emit');

      host.component.toggleCheckedRows();
      host.detectChanges();

      expect(host.component.selectionChange.emit).toHaveBeenCalled();
    });

    it('must be emitted every time when `updateCheckedRows` is triggered', async () => {
      const host = await createComponent({ config: mockConfig }, true);

      spyOn(host.component.selectionChange, 'emit');

      host.component.updateCheckedRows();
      host.detectChanges();

      expect(host.component.selectionChange.emit).toHaveBeenCalled();
    });
  });
});
