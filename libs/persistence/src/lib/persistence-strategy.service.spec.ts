import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { PersistenceStrategyService } from './persistence-strategy.service';
import { PersistenceModule } from './persistence.module';

const mockStrategyType = 'mockStrategyType';

class MockPersistenceStrategy {
  save = jest.fn();
  retrieve = jest.fn();
  remove = jest.fn();
}

describe('PersistenceStrategyService', () => {
  let service: PersistenceStrategyService;
  let persistenceStrategy: MockPersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PersistenceModule.withStrategies({
          [mockStrategyType]: MockPersistenceStrategy,
          mockSecondStrategyType: MockPersistenceStrategy,
        }),
      ],
      providers: [MockPersistenceStrategy],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(PersistenceStrategyService);
    persistenceStrategy = TestBed.inject(MockPersistenceStrategy);
  });

  it('select method must return PersistenceStrategy', () => {
    const returnedStrategy = service.select(mockStrategyType);

    expect(returnedStrategy).toEqual(persistenceStrategy);
  });

  it('select method must throw error if no PersistenceStrategy found', () => {
    expect(() => {
      service.select('mockInvalidStrategyType');
    }).toThrow();
  });

  it('getAll method must all PersistenceStrategies from object PersistenceStrategyTypesToken', () => {
    const returnedStrategies = service.getAll();

    expect(returnedStrategies).toEqual([
      persistenceStrategy,
      persistenceStrategy,
    ]);
  });
});
