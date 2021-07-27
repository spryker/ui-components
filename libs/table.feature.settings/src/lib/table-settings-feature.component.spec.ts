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
} from '@spryker/table/testing';
import { TableSettingsFeatureComponent } from './table-settings-feature.component';

import { LocalStoragePersistenceStrategy } from '@spryker/persistence';
import { By } from '@angular/platform-browser';
import { ReplaySubject, Observable } from 'rxjs';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
  TableColumns,
  TableDataConfig,
  TableData,
} from '@spryker/table';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestLocaleModule, I18nTestService } from '@spryker/locale/testing';
import { IconSettingsModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TableSettingsColumn } from './types';

// tslint:disable: no-non-null-assertion

class MockLocalStoragePersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new ReplaySubject(1);
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
}

class MockTableDataConfiguratorService {
  readonly config$ = new ReplaySubject<TableDataConfig>(1);
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
  let httpTestingController: HttpTestingController;
  let columnsObs$: Observable<TableColumns>;
  let mockData: TableData;

  const columns: TableSettingsColumn[] = [
    { id: 'col1', title: 'Column #1', hideable: true },
    { id: 'col2', title: 'Column #2', hideable: true },
    { id: 'col3', title: 'Column #3', hideable: true },
  ];

  const expectedColumnsUncheckResult: TableSettingsColumn[] = [
    { id: 'col2', title: 'Column #2', hideable: true },
    { id: 'col3', title: 'Column #3', hideable: true },
  ];

  const expectedColumnsCheckResult: TableSettingsColumn[] = [
    { id: 'col1', title: 'Column #1', hideable: true, hidden: false },
    { id: 'col2', title: 'Column #2', hideable: true },
    { id: 'col3', title: 'Column #3', hideable: true },
  ];

  const expectedColumnsDragResult: TableSettingsColumn[] = [
    { id: 'col2', title: 'Column #2', hideable: true },
    { id: 'col1', title: 'Column #1', hideable: true },
    { id: 'col3', title: 'Column #3', hideable: true },
  ];

  const popoverComponent = 'spy-popover';
  const buttonToggle = 'spy-button-toggle';
  const icon = '.spy-icon-settings';
  const settingsFeature = '.spy-table-settings-feature';
  const checkbox = 'spy-checkbox';
  const resetBtn = '.spy-table-settings-feature__reset-button';

  function queryPopover(): DebugElement {
    return fixture.debugElement.query(By.css(popoverComponent));
  }

  function queryButtonToggle(): DebugElement {
    return fixture.debugElement.query(By.css(buttonToggle));
  }

  function queryIcon(): DebugElement {
    return fixture.debugElement.query(By.css(icon));
  }

  function querySettings(): DebugElement {
    return fixture.debugElement.query(By.css(settingsFeature));
  }

  function queryCheckbox(): DebugElement {
    return fixture.debugElement.query(By.css(checkbox));
  }

  function queryReset(): DebugElement {
    return fixture.debugElement.query(By.css(resetBtn));
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
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
            },
          },
        },
        MockTableDataConfiguratorService,
        MockLocalStoragePersistenceStrategy,
        TableColumnsResolverService,
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

    columnsObs$ = TestBed.inject(TableColumnsResolverService).resolve(
      columns as any,
    );

    mockData = {
      data: [{}],
      page: 0,
      pageSize: 0,
      total: 10,
    };

    testLocalStoragePersistenceStrategy.retrieveSubject$.next(null);

    fixture.detectChanges();
    tick();

    testTableFeature.featureMocks?.table.data$?.next(mockData);

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

  it('component should render `spy-table-settings-feature__item` elements', fakeAsync(() => {
    columnsObs$.subscribe();
    fixture.detectChanges();
    tick();

    const columnsArr = fixture.nativeElement.querySelectorAll(
      '.spy-table-settings-feature__item',
    );
    expect(columnsArr.length).toBe(columns.length);
  }));

  it('component should be able to drag and drop elements in list of columns', fakeAsync(() => {
    const subsctiptionCallbackSpy = jest.fn();

    columnsObs$.subscribe(subsctiptionCallbackSpy);
    fixture.detectChanges();
    tick();

    const columnsArr = querySettings();

    columnsArr.triggerEventHandler('cdkDropListDropped', {
      previousIndex: 1,
      currentIndex: 0,
    });

    fixture.detectChanges();
    tick();

    expect(subsctiptionCallbackSpy).toHaveBeenCalledWith(
      expectedColumnsDragResult,
    );
  }));

  it('component should be able to remove element from list of columns', fakeAsync(() => {
    const subsctiptionCallbackSpy = jest.fn();

    columnsObs$.subscribe(subsctiptionCallbackSpy);
    fixture.detectChanges();
    tick();

    const checkboxElem = queryCheckbox();

    checkboxElem.triggerEventHandler('checkedChange', {});

    fixture.detectChanges();
    tick();

    expect(subsctiptionCallbackSpy).toHaveBeenCalledWith(
      expectedColumnsUncheckResult,
    );
  }));

  it('component should be able to move element back to the correct position to list of columns', fakeAsync(() => {
    const subsctiptionCallbackSpy = jest.fn();

    columnsObs$.subscribe(subsctiptionCallbackSpy);
    fixture.detectChanges();
    tick();

    const checkboxElem = queryCheckbox();

    checkboxElem.triggerEventHandler('checkedChange', {});

    fixture.detectChanges();
    tick();

    checkboxElem.triggerEventHandler('checkedChange', {});

    fixture.detectChanges();
    tick();

    expect(subsctiptionCallbackSpy).toHaveBeenCalledWith(
      expectedColumnsCheckResult,
    );
  }));

  it('Reset button should reset columns list to the default state', fakeAsync(() => {
    const subsctiptionCallbackSpy = jest.fn();

    columnsObs$.subscribe(subsctiptionCallbackSpy);
    fixture.detectChanges();
    tick();

    const checkboxElem = queryCheckbox();

    checkboxElem.triggerEventHandler('checkedChange', {});

    fixture.detectChanges();
    tick();

    const resetBtnElem = queryReset();

    resetBtnElem.triggerEventHandler('click', {});

    fixture.detectChanges();
    tick();

    expect(subsctiptionCallbackSpy).toHaveBeenCalledWith(columns);
  }));
});
