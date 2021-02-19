import { TestBed } from '@angular/core/testing';

import { CollateDataConfiguratorService } from './collate-data-configurator.service';
import { CollateDataTransformerModule } from './collate-data-transformer.module';
import { Injector } from '@angular/core';

const mockDataConfiguratorType = 'mockDataConfiguratorType';

class MockCollateDataConfigurator {
  resolve = jest.fn();
}

describe('CollateFilterService', () => {
  let service: CollateDataConfiguratorService;
  let collateDataConfigurator: MockCollateDataConfigurator;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CollateDataTransformerModule.withConfigurators({
          [mockDataConfiguratorType]: MockCollateDataConfigurator,
        }),
      ],
      providers: [MockCollateDataConfigurator],
    });

    service = TestBed.inject(CollateDataConfiguratorService);
    collateDataConfigurator = TestBed.inject(MockCollateDataConfigurator);
    injector = TestBed.inject(Injector);
  });

  it('resolve method returns the result from call CollateDataConfigurator.resolve() with injector props', () => {
    const mockTransformerValue = 'mockTransformerValue';
    const mockConfig = {
      type: mockDataConfiguratorType,
    };

    collateDataConfigurator.resolve.mockReturnValue(mockTransformerValue);
    const serviceValue = service.resolve(mockConfig, injector);

    expect(collateDataConfigurator.resolve).toHaveBeenCalledWith(injector);
    expect(serviceValue).toBe(mockTransformerValue);
  });

  it('filter method find the CollateFilter based on the type from CollateFiltersTypesToken, if no CollateFilter found - throw an error', () => {
    const mockConfig = {
      type: 'invalidType',
    };

    expect(() => {
      service.resolve(mockConfig, injector);
    }).toThrow();
  });
});
