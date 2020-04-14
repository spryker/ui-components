import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TableSyncStateFeatureComponent } from './table-sync-state-feature.component';

import { UrlPersistenceStrategy } from '@spryker/utils';
import { Subject } from 'rxjs';
import { TableDataConfiguratorService } from '@spryker/table';

class MockUrlPersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new Subject();
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
}

class MockTableDataConfiguratorService extends TableDataConfiguratorService {
  config$: any = new Subject();
  reset = jest.fn();
}

describe('TableSyncStateFeatureComponent', () => {
  let fixture: ComponentFixture<TableSyncStateFeatureComponent>;
  let testTableFeature: TableSyncStateFeatureComponent;
  let testUrlPersistenceStrategyService: MockUrlPersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [TableSyncStateFeatureComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: UrlPersistenceStrategy,
          useExisting: MockUrlPersistenceStrategy,
        },
        MockUrlPersistenceStrategy,
      ],
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TableSyncStateFeatureComponent);
    testTableFeature = fixture.componentInstance;

    testUrlPersistenceStrategyService = TestBed.inject(
      MockUrlPersistenceStrategy,
    );

    fixture.detectChanges();
  }));

  it('If dataConfiguratorService config was updated, save merhod of urlPersistanceStrategy has to be called', fakeAsync(() => {
    const dataConfiguratorService = new MockTableDataConfiguratorService();
    const mockedConfig = { page: 1 };
    const mockedValue = 'table-state';

    testTableFeature.setDataConfiguratorService(dataConfiguratorService);

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
    const mockedKey = 'table-state';

    testTableFeature.setDataConfiguratorService(dataConfiguratorService);

    fixture.detectChanges();

    testUrlPersistenceStrategyService.retrieveSubject$.next(mockedValue);

    expect(testUrlPersistenceStrategyService.retrieve).toHaveBeenCalledWith(
      mockedKey,
    );
    expect(dataConfiguratorService.reset).toHaveBeenCalledWith(mockedValue);
  }));
});
