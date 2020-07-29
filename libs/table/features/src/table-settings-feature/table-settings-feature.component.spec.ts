import {
  Component,
  NO_ERRORS_SCHEMA,
  Injector,
  DebugElement,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  TestTableFeatureComponent,
  TestTableFeatureMocks,
  TestTableFeatureTplDirective,
} from '@spryker/table/features/testing';
import { TableSettingsFeatureComponent } from './table-settings-feature.component';

import { LocalStoragePersistenceStrategy } from '@spryker/utils';
import { By } from '@angular/platform-browser';
import { Subject, ReplaySubject, of } from 'rxjs';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
  TableData,
  TableColumns,
  TableDataConfig,
} from '@spryker/table';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestLocaleModule, I18nTestService } from '@spryker/locale/testing';
import { IconSettingsModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

// tslint:disable: no-non-null-assertion

class MockLocalStoragePersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new Subject();
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
}

class MockTableColumnsResolverService {
  addTransformer = jest.fn();
  resolve = (columns: TableColumns) => of(columns);
}

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-settings-feature></spy-table-settings-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableSettingsFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let injector: Injector;
  let testLocalStoragePersistenceStrategy: MockLocalStoragePersistenceStrategy;
  let testLocaleService: I18nTestService;
  let mockData: TableData;
  let columns: TableColumns;
  let httpTestingController: HttpTestingController;

  const popoverComponent = 'spy-popover';
  const buttonToggle = 'spy-button-toggle';
  const icon = '.spy-icon-settings';

  function queryPopover(): DebugElement {
    return fixture.debugElement.query(By.css(popoverComponent));
  }

  function queryButtonToggle(): DebugElement {
    return fixture.debugElement.query(By.css(buttonToggle));
  }

  function queryIcon(): DebugElement {
    return fixture.debugElement.query(By.css(icon));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DragDropModule,
        TestLocaleModule,
        IconModule,
        IconSettingsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        TestTableFeatureTplDirective,
        TableSettingsFeatureComponent,
        TestHostComponent,
        TestTableFeatureComponent,
      ],
      providers: [
        {
          provide: TableDatasourceService,
          useValue: 'TableDatasourceService',
        },
        {
          provide: LocalStoragePersistenceStrategy,
          useExisting: MockLocalStoragePersistenceStrategy,
        },
        {
          provide: TableDataConfiguratorService,
          useExisting: MockTableDataConfiguratorService,
        },
        {
          provide: TableColumnsResolverService,
          useExisting: MockTableColumnsResolverService,
        },

        {
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
            },
          },
        },
        MockTableDataConfiguratorService,
        MockLocalStoragePersistenceStrategy,
        MockTableColumnsResolverService,
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

    testLocaleService = TestBed.inject(I18nTestService);
    testLocalStoragePersistenceStrategy = TestBed.inject(
      MockLocalStoragePersistenceStrategy,
    );

    httpTestingController = TestBed.inject(HttpTestingController);

    mockData = {
      data: [{}],
      page: 3,
      pageSize: 30,
      total: 10,
    };

    columns = [
      { id: 'col1', title: 'Column #1', hideable: true },
      { id: 'col2', title: 'Column #2', hideable: true },
      { id: 'col3', title: 'Column #3', hideable: true },
    ];

    TestBed.inject(MockTableColumnsResolverService).resolve(columns);

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);

    testTableFeature.featureMocks?.table.columns$?.next(columns);

    fixture.detectChanges();
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should render `spy-popover`', fakeAsync(() => {
    expect(queryPopover()).toBeTruthy();
  }));

  it('should render `spy-button-toggle` with [trigger] attribute', fakeAsync(() => {
    const spyButtonToggle = queryButtonToggle();
    expect(spyButtonToggle.attributes.trigger).toBe('');
  }));

  it('should render `spy-icon` for spy-button-toggle', fakeAsync(() => {
    expect(queryIcon()).toBeTruthy();
  }));
});
