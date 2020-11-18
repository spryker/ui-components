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

const mockColumns = { id: 'col1', title: 'col1' };
const mockUpdateConfig = {
  url: 'test-url',
  saveButton: { title: 'Save' },
  cancelButton: { title: 'Cancel Update' },
};

const mockConfig = {
  columns: [{ id: 'col1', type: 'edit' }],
  create: {
    addButton: { title: 'addButton', icon: 'warning' },
    cancelButton: { title: 'Cancel Create', icon: 'warning' },
    formInputName: 'form-input-name',
    initialData: {
      data: [{ col1: 'value 2' }],
      errors: {
        0: {
          rowError: 'message',
          columnErrors: {
            col1: 'errorMessage errorMessage errorMessage',
          },
        },
      },
    },
  },
  update: mockUpdateConfig,
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
              columns: [mockColumns],
            },
            [TableFeatureLocation.cell]: {
              config: mockColumns,
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testTableFeature = fixture.debugElement.query(
      By.directive(TestTableFeatureComponent),
    ).componentInstance;

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.columns$?.next([mockColumns]);

    fixture.detectChanges();
  }));

  describe('Create Section', () => {
    it('should render `input[type=hidden]` element with name from `config.create.formInputName`', () => {
      const inputElem = fixture.debugElement.query(
        By.css('input[type=hidden]'),
      );

      expect(inputElem.properties.name).toBe(mockConfig.create.formInputName);
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
