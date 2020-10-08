import { OverlayModule } from '@angular/cdk/overlay';
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
  TableData,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplDirective,
} from '@spryker/table/testing';
import {
  DefaultContextSerializationModule,
  InvokeModule,
} from '@spryker/utils';
import { ReplaySubject } from 'rxjs';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-editable-feature></spy-table-editable-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

class MockAjaxActionService {
  handle = jest.fn();
}

describe('TableEditableFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InvokeModule,
        HttpClientTestingModule,
        DefaultContextSerializationModule,
        OverlayModule,
      ],
      declarations: [
        TestTableFeatureTplDirective,
        TableEditableFeatureComponent,
        TestTableFeatureComponent,
        TestHostComponent,
      ],
      providers: [
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
          useClass: MockTableDataConfiguratorService,
        },
        { provide: AjaxActionService, useExisting: MockAjaxActionService },
        MockAjaxActionService,
        MockTableDataConfiguratorService,
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              columns: [
                { id: 'col1', type: 'edit' },
                { id: 'col2', type: 'edit' },
              ],
              create: {
                addButton: { title: 'addButton', icon: 'warning' },
                cancelButton: { title: 'Cancel' },
                formInputName: 'form-input-name',
                initialData: {
                  data: [{ col1: 'value 2' }, { col2: 'value' }],
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
              update: {
                url: 'test-url',
                saveButton: { title: 'Save' },
                cancelButton: { title: 'Cancel' },
              },
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

    mockData = {
      data: [{}],
      page: 0,
      pageSize: 0,
      total: 10,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
  }));

  it('teststtss', async () => {
    // console.log(fixture);
    // fixture.detectChanges();

    const spanPlaceholder = fixture.debugElement.query(
      By.css('.spy-table-editable-feature__th'),
    );
    console.log(spanPlaceholder?.nativeElement.innerHTML);
  });
});
