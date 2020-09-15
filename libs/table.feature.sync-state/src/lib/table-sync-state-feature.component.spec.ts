import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { TableSyncStateFeatureComponent } from './table-sync-state-feature.component';

import { UrlPersistenceStrategy } from '@spryker/utils';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import {
  TableColumnsResolverService,
  TableDataConfiguratorService,
  TableDatasourceService,
} from '@spryker/table';

// tslint:disable: no-non-null-assertion

class MockUrlPersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new Subject();
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
}

class MockTableDataConfiguratorService extends TableDataConfiguratorService {
  config$: any = new Subject();
  reset = jest.fn();
}

@Component({
  selector: 'spy-test-host',
  template: `
    <test-table-feature>
      <spy-table-sync-state-feature></spy-table-sync-state-feature>
    </test-table-feature>
  `,
})
class TestHostComponent {}

describe('TableSyncStateFeatureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testTableFeature: TestTableFeatureComponent;
  let testUrlPersistenceStrategyService: MockUrlPersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestTableFeatureTplDirective,
        TableSyncStateFeatureComponent,
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
          provide: UrlPersistenceStrategy,
          useExisting: MockUrlPersistenceStrategy,
        },
        TableDataConfiguratorService,
        MockUrlPersistenceStrategy,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testTableFeature = fixture.debugElement.query(
      By.directive(TestTableFeatureComponent),
    ).componentInstance;

    testUrlPersistenceStrategyService = TestBed.inject(
      MockUrlPersistenceStrategy,
    );

    fixture.detectChanges();
    tick();
  }));

  it('If dataConfiguratorService config was updated, save merhod of urlPersistanceStrategy has to be called', fakeAsync(() => {
    const dataConfiguratorService = new MockTableDataConfiguratorService();
    const mockedConfig = { page: 1 };
    const mockedValue = 'mockTableId';

    testTableFeature.feature!.setDataConfiguratorService(
      dataConfiguratorService,
    );

    fixture.detectChanges();

    dataConfiguratorService.config$.next(mockedConfig);

    expect(testUrlPersistenceStrategyService.save).toHaveBeenCalledWith(
      mockedValue,
      mockedConfig,
    );
  }));

  it('If retrieve merhod of urlPersistanceStrategy was called, dataConfiguratorService reset method has to be called', fakeAsync(() => {
    const dataConfiguratorService = new MockTableDataConfiguratorService();
    const mockedValue = '123';
    const mockedKey = 'mockTableId';

    testTableFeature.feature!.setDataConfiguratorService(
      dataConfiguratorService,
    );

    fixture.detectChanges();

    testUrlPersistenceStrategyService.retrieveSubject$.next(mockedValue);

    expect(testUrlPersistenceStrategyService.retrieve).toHaveBeenCalledWith(
      mockedKey,
    );
    expect(dataConfiguratorService.reset).toHaveBeenCalledWith(mockedValue);
  }));
});
