// tslint:disable: no-non-null-assertion
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

import { TableComponent } from './table.component';
import {
  TableConfig,
  TableColumns,
  TableRowActionBase,
  TableActionTriggeredEvent,
} from './table';

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
  size: 10,
  offset: 1,
};
const mockConfig: TableConfig = {
  dataUrl: mockDataUrl,
  columnsUrl: mockColUrl,
};
const mockConfigCols: TableConfig = {
  dataUrl: mockDataUrl,
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

    it('must render spy-pagination after spy-table-features-renderer and nz-table', async () => {
      const host = await createComponent({ config: mockConfig }, true);
      const paginationElem = host.queryCss(
        'nz-table + spy-table-features-renderer + spy-pagination',
      );

      expect(paginationElem).toBeTruthy();
    });

    describe('spy-table-features-renderer', () => {
      let component: TableComponent;
      let fixture: ComponentFixture<TableComponent>;

      beforeEach(() => {
        TestBed.overrideComponent(TableComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        });

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;

        fixture.componentInstance.config = mockConfig;
        fixture.detectChanges();
      });

      it('must render in the `ant-table-features-col--dynamic` div with features=`featuresLocation[`top`] value', () => {
        const mockFeature = 'top feature';

        fixture.componentInstance.featuresLocation = {
          top: mockFeature,
        } as any;

        fixture.detectChanges();

        const spyTableFeaturesElem = fixture.debugElement.query(
          By.css(
            '.ant-table-features-col--dynamic spy-table-features-renderer',
          ),
        );

        expect(spyTableFeaturesElem).toBeTruthy();
        expect(spyTableFeaturesElem!.properties.features).toBe(mockFeature);
      });

      it('must render after `nz-table` with features=`featuresLocation[`after-table`] value', () => {
        const mockFeature = 'after table feature';

        fixture.componentInstance.featuresLocation = {
          'after-table': mockFeature,
        } as any;

        fixture.detectChanges();

        const spyTableFeaturesElem = fixture.debugElement.query(
          By.css('nz-table + spy-table-features-renderer'),
        );

        expect(spyTableFeaturesElem).toBeTruthy();
        expect(spyTableFeaturesElem!.properties.features).toBe(mockFeature);
      });

      it('must render as `th` in `thead` with features=`featuresLocation[`header-ext`] value and maxFeatures=`1` attribute', () => {
        const mockFeature = 'header ext feature';

        fixture.componentInstance.featuresLocation = {
          'header-ext': mockFeature,
        } as any;

        fixture.detectChanges();

        const spyTableFeaturesElem = fixture.debugElement.query(
          By.css('thead th:last-child spy-table-features-renderer'),
        );

        expect(spyTableFeaturesElem).toBeTruthy();
        expect(spyTableFeaturesElem!.properties.features).toBe(mockFeature);
        expect(spyTableFeaturesElem!.attributes.maxFeatures).toBe('1');
      });

      it('must render after `spy-pagination` with features=`featuresLocation[`bottom`] value', () => {
        const mockFeature = 'bottom feature';

        fixture.componentInstance.featuresLocation = {
          bottom: mockFeature,
        } as any;

        fixture.detectChanges();

        const spyTableFeaturesElem = fixture.debugElement.query(
          By.css('spy-pagination + spy-table-features-renderer'),
        );

        expect(spyTableFeaturesElem).toBeTruthy();
        expect(spyTableFeaturesElem!.properties.features).toBe(mockFeature);
      });
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
        const callback = jest.fn();
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        expect(columnsRes.request.method).toBe('GET');

        columnsRes.flush(mockCols);
        host.detectChanges();
        host.component.columns$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockCols);
      });

      it('returned columns$ Observable should match the right data with `columns` key', async () => {
        const host = await createComponent({ config: mockConfigCols }, true);
        const callback = jest.fn();
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        host.detectChanges();
        host.component.columns$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockCols);
      });

      it('returned data$ Observable should match the right data', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const callback = jest.fn();
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        expect(dataRes.request.method).toBe('GET');

        dataRes.flush(mockData);
        host.detectChanges();
        host.component.data$.subscribe(callback);

        expect(callback).toHaveBeenCalledWith(mockData);
      });

      it('prop data$ must be mapped into tbody and render spy-table-column-renderer at each td', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
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
      });

      it('prop data$ must be mapped into appropriate attributes of `spy-pagination` component', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        dataRes.flush(mockData);
        columnsRes.flush(mockCols);
        host.detectChanges();

        const paginationElement = host.queryCss('spy-pagination');

        expect(paginationElement!.properties.total).toBe(mockData.total);
        expect(paginationElement!.properties.pageSize).toBe(mockData.size);
        expect(paginationElement!.properties.page).toBe(mockData.offset);
      });

      it('prop columns$ must be mapped into thead and create with tr and each th of the table', async () => {
        const host = await createComponent({ config: mockConfig }, true);
        const columnsRes = httpTestingController.expectOne(mockColUrl);
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
      });
    });

    describe('selectable is true', () => {
      const mockSelectableConfig = { ...mockConfigCols, selectable: true };

      it('should create first `th` with `spy-checkbox` into each `tr` into `thead`', async () => {
        const host = await createComponent(
          { config: mockSelectableConfig },
          true,
        );
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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

        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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

        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
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
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        const tableElem = host.queryCss('nz-table');

        expect(tableElem!.properties.nzScroll.y).toBe(
          mockHeaderConfig.fixHeader,
        );
      });
    });

    describe('pageSizes', () => {
      const defaultSizesArray = [10, 20, 50];
      const mockSizesArray = [20, 30, 40];
      const mockSizesConfig = { ...mockConfigCols, pageSizes: mockSizesArray };

      it('should bind to `nzScroll` input of `nz-table` component', async () => {
        const host = await createComponent({ config: mockConfigCols }, true);
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        const paginationElem = host.queryCss('spy-pagination');

        expect(paginationElem!.properties.pageSizeOptions).toEqual(
          defaultSizesArray,
        );

        host.setInputs({ config: mockSizesConfig }, true);

        expect(paginationElem!.properties.pageSizeOptions).toEqual(
          mockSizesArray,
        );
      });
    });

    describe('rowActions', () => {
      const mockActions = [
        { id: '1234', title: '123' },
        { id: '2345', title: '234' },
      ] as TableRowActionBase[];
      const mockActionsConfig = { ...mockConfigCols, rowActions: mockActions };

      it('render extra td as last column with `spy-dropdown` component', async () => {
        const host = await createComponent({ config: mockActionsConfig }, true);
        const dataRes = httpTestingController.expectOne(req =>
          req.url.includes(mockDataUrl),
        );

        dataRes.flush(mockData);
        host.detectChanges();

        const dropDownElem = host.queryCss('tr td:last-child spy-dropdown');

        expect(dropDownElem).toBeTruthy();
      });
    });
  });

  describe('@Output(selectionChange)', () => {
    it('must be emitted every time when `toggleCheckedRows` is triggered', async () => {
      const host = await createComponent({ config: mockConfig }, true);

      host.component.toggleCheckedRows();
      host.detectChanges();

      expect(host.hostComponent.selectionChange).toHaveBeenCalledWith([]);
    });

    it('must be emitted every time when `updateCheckedRows` is triggered', async () => {
      const host = await createComponent({ config: mockConfig }, true);

      host.component.updateCheckedRows();
      host.detectChanges();

      expect(host.hostComponent.selectionChange).toHaveBeenCalledWith([]);
    });
  });

  describe('@Output(actionTriggered)', () => {
    const mockActions = [
      { id: '1234', title: '123' },
      { id: '2345', title: '234' },
    ] as TableRowActionBase[];
    const mockActionsConfig = { ...mockConfigCols, rowActions: mockActions };

    it('must be emitted every time when `actionTriggerHandler` is triggered', async () => {
      const host = await createComponent({ config: mockActionsConfig }, true);
      const actionTriggeredRes: TableActionTriggeredEvent = {
        action: mockActions[0],
        items: [],
      };

      host.component.actionTriggerHandler(mockActions[0].id, []);
      host.detectChanges();

      expect(host.hostComponent.actionTriggered).toHaveBeenCalledWith(
        actionTriggeredRes,
      );
    });

    it('must be emitted every time when `actionTriggerHandler` is triggered', async () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      const host = await createComponent({ config: mockActionsConfig }, true);
      const dataRes = httpTestingController.expectOne(req =>
        req.url.includes(mockDataUrl),
      );
      const actionTriggeredRes: TableActionTriggeredEvent = {
        action: mockActions[0],
        items: [mockData.data[0]],
      };

      dataRes.flush(mockData);
      host.detectChanges();

      const dropDownElem = host.queryCss('tr td:last-child spy-dropdown');

      dropDownElem!.triggerEventHandler('actionTriggered', mockActions[0].id);

      host.detectChanges();

      expect(host.hostComponent.actionTriggered).toHaveBeenCalledWith(
        actionTriggeredRes,
      );

      httpTestingController.verify();
    });
  });
});
