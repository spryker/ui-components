import {
  Component,
  DebugElement,
  NO_ERRORS_SCHEMA,
  Injector,
} from '@angular/core';
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
  TestTableFeatureMocks,
  TestTableFeatureTplContext,
} from '@spryker/table/features/testing';
import { TableRowActionsFeatureComponent } from './table-row-actions-feature.component';
import { FilterAvailableActionsPipe } from './table-row-actions.pipe';
import {
  TableColumnsResolverService,
  TableData,
  TableDataConfig,
  TableDataConfiguratorService,
  TableDatasourceService,
  TableFeatureLocation,
  TableActionsToken,
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

class MockTableFormOverlayActionHandlerService {
  handleAction = jest.fn();
}

describe('TableRowActionsFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let mockData: TableData;
  let injector: Injector;
  const mockActions = [
    { id: '1234', title: '123', type: 'rowActions' },
    { id: 'add', title: 'Add', type: 'rowActions' },
  ];
  const mockAvailableActions = ['add'];
  const mockClick = '1234';

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
        FilterAvailableActionsPipe,
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
        MockTableFormOverlayActionHandlerService,
        {
          provide: TableActionsToken,
          useValue: {
            rowActions: MockTableFormOverlayActionHandlerService,
          },
          multi: true,
        },
        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
              actions: mockActions,
              click: mockClick,
            },
          },
        },
        {
          provide: TestTableFeatureTplContext,
          useValue: {
            [TableFeatureLocation.afterCols]: {
              data: {},
              i: 0,
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(fakeAsync(() => {
    injector = TestBed.inject(Injector);
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
    const transformedActions = mockActions.map(({ id: action, title }) => ({
      action,
      title,
    }));

    expect(queryDropdown().properties.items).toEqual(transformedActions);
  }));

  it('should trigger `handleAction` method of TableActionsService with data when dropdown changes', fakeAsync(() => {
    const actionTriggeredRes = {
      action: mockActions[0],
      items: [mockData.data[0]],
    };
    const tableActionsService = TestBed.inject(
      MockTableFormOverlayActionHandlerService,
    );

    queryDropdown().triggerEventHandler('actionTriggered', mockActions[0].id);

    fixture.detectChanges();

    expect(tableActionsService.handleAction).toHaveBeenCalledWith(
      actionTriggeredRes,
      injector,
    );
  }));
});
