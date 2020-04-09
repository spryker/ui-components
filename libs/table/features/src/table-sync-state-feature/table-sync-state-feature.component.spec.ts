import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TableSyncStateFeatureComponent } from './table-sync-state-feature.component';

import { UrlPersistenceStrategy } from '@spryker/utils';
import { Subject } from 'rxjs';

@Injectable()
class MockUrlPersistenceStrategy {
  save = jest.fn();
  retrieveSubject$ = new Subject();
  retrieve = jest.fn().mockReturnValue(this.retrieveSubject$);
}

class MockTableDataConfiguratorService {
  config$ = new Subject();
  reset = jest.fn();
}

describe('TableSyncStateFeatureComponent', () => {
  let fixture: ComponentFixture<TableSyncStateFeatureComponent>;
  let testTableFeature: any;
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

    TestBed.overrideComponent(TableSyncStateFeatureComponent, {
      set: {
        providers: [MockUrlPersistenceStrategy],
      },
    });
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TableSyncStateFeatureComponent);
    testTableFeature = fixture.componentInstance;

    testUrlPersistenceStrategyService = TestBed.inject(
      MockUrlPersistenceStrategy,
    );

    fixture.detectChanges();
    tick();
    testTableFeature.featureMocks?.table.config$?.next({});
  }));

  it('If dataConfiguratorService config was updated, save merhod of urlPersistanceStrategy has to be called', fakeAsync(() => {
    const dataConfiguratorService = new MockTableDataConfiguratorService();
    const mockedConfig = { page: 1 };

    testTableFeature.setDataConfiguratorService(dataConfiguratorService);

    fixture.detectChanges();

    dataConfiguratorService.config$.next(mockedConfig);

    expect(testUrlPersistenceStrategyService.save).toHaveBeenCalled();
  }));

  it('If retrieve merhod of urlPersistanceStrategy was called, dataConfiguratorService reset method has to be called', fakeAsync(() => {
    const dataConfiguratorService = new MockTableDataConfiguratorService();
    const mockedKey = 'table-state';
    const mockedValue = '123';

    testTableFeature.setDataConfiguratorService(dataConfiguratorService);

    fixture.detectChanges();

    testUrlPersistenceStrategyService.retrieve(mockedKey).next(mockedValue);

    expect(dataConfiguratorService.reset).toHaveBeenCalled();
  }));
});
