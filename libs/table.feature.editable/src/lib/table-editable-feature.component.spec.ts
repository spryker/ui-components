import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AjaxActionService } from '@spryker/ajax-action';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
  TableFeatureLocation,
  TableFeaturesRendererService,
} from '@spryker/table';
import {
  buttonClassName,
  ButtonModule,
  ButtonShape,
  ButtonSize,
  ButtonVariant,
} from '@spryker/button';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplContext,
  TestTableFeatureTplDirective,
} from '@spryker/table/testing';
import {
  DefaultContextSerializationModule,
  InvokeModule,
} from '@spryker/utils';
import { TestLocaleModule } from '@spryker/locale/testing';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

const mockColumns = [
  { id: 'col1', title: 'col1' },
  { id: 'col2', title: 'col2' },
  { id: 'col3', title: 'col3' },
];
const mockUpdateConfig = {
  url: 'test-url',
  saveButton: { title: 'Save' },
  cancelButton: { title: 'Cancel Update' },
  disableForCols: ['col2'],
};

const mockConfig = {
  columns: [
    { id: 'col1', type: 'edit' },
    { id: 'col2', type: 'edit' },
    { id: 'col3', type: 'edit' },
  ],
  create: {
    addButton: {
      title: 'addButton',
      icon: 'warning',
      variant: ButtonVariant.Primary,
      size: ButtonSize.Medium,
      shape: ButtonShape.Default,
    },
    cancelButton: { title: 'Cancel Create', icon: 'warning' },
    formInputName: 'form-input-name',
    initialData: {
      data: [
        { col1: 'value 2', col2: 'value' },
        { col1: 'value', col2: 'value', col3: 'value' },
      ],
      errors: {
        0: {
          rowError: 'message',
          columnErrors: {
            col1: 'errorMessage errorMessage errorMessage',
          },
        },
      },
    },
    disableForCols: ['col2'],
  },
  update: mockUpdateConfig,
  disableRowKey: 'col3',
};

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-editable-feature></spy-table-editable-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableEditableFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InvokeModule,
        HttpClientTestingModule,
        DefaultContextSerializationModule,
        OverlayModule,
        TestLocaleModule,
        ButtonModule,
      ],
      declarations: [
        TestTableFeatureTplDirective,
        TableEditableFeatureComponent,
        TestTableFeatureComponent,
        TestHostComponent,
      ],
      providers: [
        TableFeaturesRendererService,
        {
          provide: TableColumnsResolverService,
          useValue: 'TableColumnsResolverService',
        },
        {
          provide: TableDatasourceService,
          useValue: 'TableDatasourceService',
        },
        {
          provide: TableDataConfiguratorService,
          useValue: 'MockTableDataConfiguratorService',
        },
        { provide: AjaxActionService, useValue: 'MockAjaxActionService' },
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              ...mockConfig,
            },
          },
        },
        {
          provide: TestTableFeatureTplContext,
          useValue: {
            [TableFeatureLocation.beforeRows]: {
              columns: mockColumns,
            },
            [TableFeatureLocation.cell]: {
              config: mockColumns[0],
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testTableFeature = fixture.debugElement.query(
      By.directive(TestTableFeatureComponent),
    ).componentInstance;

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.columns$?.next(mockColumns);

    fixture.detectChanges();
  }));

  describe('Create Section', () => {
    it('should render `input[type=hidden]` element with name from `config.create.formInputName`', () => {
      const inputElem = fixture.debugElement.query(
        By.css('input[type=hidden]'),
      );

      expect(inputElem.attributes.name).toBe(mockConfig.create.formInputName);
    });

    it('should sync `config.create.initialData.data` to `ngModel` of the `input[type=hidden]` element`', () => {
      const inputElem = fixture.debugElement.query(
        By.css('input[type=hidden]'),
      );

      expect(inputElem.properties.ngModel).toBe(
        JSON.stringify(mockConfig.create.initialData.data),
      );
    });

    it('should render `spy-button` with `config.create.addButton.title` text', () => {
      const createButtonElem = fixture.debugElement.query(
        By.css('spy-button.spy-table-editable-feature__create-row'),
      );

      expect(createButtonElem).toBeTruthy();
      expect(createButtonElem.nativeElement.textContent).toContain(
        mockConfig.create.addButton.title,
      );
    });

    it('should render `spy-icon` inside `spy-button` with `config.create.addButton.icon` name', () => {
      const createIconElem = fixture.debugElement.query(
        By.css('spy-button.spy-table-editable-feature__create-row spy-icon'),
      );

      expect(createIconElem).toBeTruthy();
      expect(createIconElem.properties.name).toBe(
        mockConfig.create.addButton.icon,
      );
    });

    it('should render `spy-button` with predefined options', () => {
      const createButtonElem = fixture.debugElement.query(
        By.css('spy-button.spy-table-editable-feature__create-row'),
      );
      expect(
        createButtonElem.classes[
          `${buttonClassName}--${mockConfig.create.addButton.variant}`
        ],
      ).toBeTruthy();
      expect(
        createButtonElem.classes[
          `${buttonClassName}--${mockConfig.create.addButton.shape}`
        ],
      ).toBeTruthy();
      expect(
        createButtonElem.classes[
          `${buttonClassName}--${mockConfig.create.addButton.size}`
        ],
      ).toBeTruthy();
    });

    it('should render additional `th` and `td` if `createConfig.cancelButton` exist', () => {
      const thElem = fixture.debugElement.query(
        By.css('.spy-table-editable-feature__th'),
      );
      const tdElem = fixture.debugElement.query(
        By.css('.spy-table-editable-feature__td'),
      );

      expect(thElem).toBeTruthy();
      expect(tdElem).toBeTruthy();
    });

    it('should render `ant-table-row spy-table-editable-feature__row` with `spy-table-editable-feature__cell` if `config.create.initialData.data` exist', () => {
      const cellElem = fixture.debugElement.query(
        By.css(
          '.spy-table-editable-feature__row .spy-table-editable-feature__cell',
        ),
      );

      expect(cellElem).toBeTruthy();
    });

    it('should render `spy-button` with `config.create.cancelButton.title` text', () => {
      const cancelButtonElem = fixture.debugElement.query(
        By.css('spy-button.spy-table-editable-feature__cancel-row'),
      );

      expect(cancelButtonElem).toBeTruthy();
      expect(cancelButtonElem.nativeElement.textContent).toContain(
        mockConfig.create.cancelButton.title,
      );
    });

    it('should render `spy-icon` inside `spy-button` with `config.create.cancelButton.icon` name', () => {
      const cancelIconElem = fixture.debugElement.query(
        By.css('spy-button.spy-table-editable-feature__cancel-row spy-icon'),
      );

      expect(cancelIconElem).toBeTruthy();
      expect(cancelIconElem.properties.name).toBe(
        mockConfig.create.cancelButton.icon,
      );
    });

    it('should render additional `tr` with `spy-table-editable-feature__error` if `config.create.initialData.errors[index].rowError` exist', () => {
      const errorTrElem = fixture.debugElement.query(
        By.css('tr .spy-table-editable-feature__error'),
      );

      expect(errorTrElem).toBeTruthy();
      expect(errorTrElem.nativeElement.textContent).toContain(
        mockConfig.create.initialData.errors[0].rowError,
      );
    });

    it('should render default `td` value if `disableForCols` has id of this column', () => {
      const rowElem = fixture.debugElement.query(
        By.css('.spy-table-editable-feature__row'),
      );
      const cellElems = rowElem.queryAll(
        By.css('.spy-table-editable-feature__cell spy-table-column-renderer'),
      );

      expect(cellElems[0].properties.config.type).toBeTruthy();
      expect(cellElems[1].properties.config.type).toBeFalsy();
    });

    it('should render default `td` values if `disableRowKey` has id of any column in row', () => {
      const rowElem = fixture.debugElement.queryAll(
        By.css('.spy-table-editable-feature__row'),
      )[1];
      const cellElems = rowElem.queryAll(
        By.css('.spy-table-editable-feature__cell spy-table-column-renderer'),
      );

      expect(cellElems[0].properties.config.type).toBeFalsy();
      expect(cellElems[1].properties.config.type).toBeFalsy();
      expect(cellElems[2].properties.config.type).toBeFalsy();
    });
  });

  describe('Update Section', () => {
    it('should render `spy-table-editable-feature__wrapper` if `columns.columns` has intersection with `table.columns`', async () => {
      const cellWrapperElem = fixture.debugElement.query(
        By.css('.spy-table-editable-feature__wrapper'),
      );

      expect(cellWrapperElem).toBeTruthy();
    });

    it('should invoke `openEditableCell` method when `spy-table-editable-feature__wrapper` has been clicked', async () => {
      const featureElem = fixture.debugElement.query(
        By.css('spy-table-editable-feature'),
      );
      const cellWrapperElem = fixture.debugElement.query(
        By.css('.spy-table-editable-feature__wrapper'),
      );

      featureElem.componentInstance.openEditableCell = jest.fn();
      cellWrapperElem.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(featureElem.componentInstance.openEditableCell).toHaveBeenCalled();
    });
  });
});
