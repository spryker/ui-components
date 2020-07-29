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
import { Subject } from 'rxjs';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
  TableData,
} from '@spryker/table';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestLocaleModule, I18nTestService } from '@spryker/locale/testing';

// tslint:disable: no-non-null-assertion

class MockLocalStoragePersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new Subject();
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
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

  const popoverComponent = 'spy-popover';

  function queryPopover(): DebugElement {
    return fixture.debugElement.query(By.css(popoverComponent));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DragDropModule, TestLocaleModule],
      declarations: [
        TestTableFeatureTplDirective,
        TableSettingsFeatureComponent,
        TestHostComponent,
        TestTableFeatureComponent,
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
          provide: TestTableFeatureMocks,
          useValue: {
            config: {
              enabled: true,
            },
          },
        },
        {
          provide: LocalStoragePersistenceStrategy,
          useExisting: MockLocalStoragePersistenceStrategy,
        },
        TableDataConfiguratorService,
        MockLocalStoragePersistenceStrategy,
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
    expect(queryPopover()).toBeTruthy();
  }));

  // it('If dataConfiguratorService config was updated, save merhod of urlPersistanceStrategy has to be called', fakeAsync(() => {
  //   const dataConfiguratorService = new MockTableDataConfiguratorService();
  //   const mockedConfig = { page: 1 };
  //   const mockedValue = 'mockTableId';

  //   testTableFeature.feature!.setDataConfiguratorService(
  //     dataConfiguratorService,
  //   );

  //   fixture.detectChanges();

  //   dataConfiguratorService.config$.next(mockedConfig);

  //   expect(testUrlPersistenceStrategyService.save).toHaveBeenCalledWith(
  //     mockedValue,
  //     mockedConfig,
  //   );
  // }));

  // it('If retrieve merhod of urlPersistanceStrategy was called, dataConfiguratorService reset method has to be called', fakeAsync(() => {
  //   const dataConfiguratorService = new MockTableDataConfiguratorService();
  //   const mockedValue = '123';
  //   const mockedKey = 'mockTableId';

  //   testTableFeature.feature!.setDataConfiguratorService(
  //     dataConfiguratorService,
  //   );

  //   fixture.detectChanges();

  //   testUrlPersistenceStrategyService.retrieveSubject$.next(mockedValue);

  //   expect(testUrlPersistenceStrategyService.retrieve).toHaveBeenCalledWith(
  //     mockedKey,
  //   );
  //   expect(dataConfiguratorService.reset).toHaveBeenCalledWith(mockedValue);
  // }));
});
