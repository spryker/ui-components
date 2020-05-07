import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TestTableFeatureTplDirective,
  TestTableFeatureComponent,
  TestTableFeatureMocks, TestTableFeatureTplContext,
} from '@spryker/table/features/testing';
import { TableRowActionsFeatureComponent } from './table-row-actions-feature.component';
import {
  TableActionService,
  TableColumnsResolverService, TableData, TableDataConfig,
  TableDataConfiguratorService,
  TableDataFetcherService, TableFeatureLocation,
} from '@spryker/table';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-row-actions-feature></spy-table-row-actions-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

describe('TableRowActionsFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;
  const mockActions = [
    { id: '1234', title: '123' },
  ];

  const dropdownSelector = 'spy-dropdown';

  function queryDropdown(): DebugElement {
    return fixture.debugElement.query(By.css(dropdownSelector));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        TestTableFeatureTplDirective,
        TableRowActionsFeatureComponent,
        TestTableFeatureComponent,
        TestHostComponent,
      ],
      providers: [
        {
          provide: TableColumnsResolverService,
          useValue: 'TableColumnsResolverService',
        },
        {
          provide: TableDataFetcherService,
          useValue: 'TableDataFetcherService',
        },
        {
          provide: TableDataConfiguratorService,
          useClass: MockTableDataConfiguratorService,
        },
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
              actions: mockActions,
            },
          },
        },
        { provide: TestTableFeatureTplContext,
          useValue: {
            [TableFeatureLocation.afterCols]: {
              data: {},
              i: 0,
            },
          },
        },
        TableActionService,
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
      page: 3,
      pageSize: 30,
      total: 10,
    };

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);
    fixture.detectChanges();
  }));

  it('should render `spy-dropdown`', fakeAsync(() => {
    expect(queryDropdown()).toBeTruthy();
  }));

  it('should bind `actions` by default to `items` property of `spy-pagination`', fakeAsync(() => {
    const transformedActions = mockActions.map(({ id: action, title }) => ({ action, title }));

    expect(queryDropdown().properties.items).toEqual(transformedActions);
  }));

  it('should emit `rowActions` with data when dropdown changes', fakeAsync(() => {
    const actionTriggeredRes = {
      action: mockActions[0],
      items: [mockData.data[0]],
    };

    queryDropdown().triggerEventHandler('actionTriggered', mockActions[0].id);

    fixture.detectChanges();

    expect(testTableFeature.featureMocks?.table.eventHandler).toHaveBeenCalledWith('rowActions', actionTriggeredRes);
  }));
});
