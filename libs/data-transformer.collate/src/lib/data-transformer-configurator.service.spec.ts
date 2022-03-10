import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { CollateDataTransformerModule } from './collate-data-transformer.module';
import { DataTransformerConfiguratorService } from './data-transformer-configurator.service';
import { DataTransformerConfigurator } from './types';

const mockDataConfiguratorType = 'mockDataConfiguratorType';

class MockDataTransformerConfigurator implements DataTransformerConfigurator {
  resolve = jest.fn();
}

describe('DataTransformerConfiguratorService', () => {
  let service: DataTransformerConfiguratorService;
  let dataTransformerConfigurator: MockDataTransformerConfigurator;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CollateDataTransformerModule.withConfigurators({
          [mockDataConfiguratorType]: MockDataTransformerConfigurator,
        }),
      ],
      providers: [MockDataTransformerConfigurator],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(DataTransformerConfiguratorService);
    dataTransformerConfigurator = TestBed.inject(
      MockDataTransformerConfigurator,
    );
    injector = TestBed.inject(Injector);
  });

  it('resolve method returns the result from call DataTransformerConfigurator.resolve() with injector props', () => {
    const mockTransformerValue = 'mockTransformerValue';
    const mockConfig = {
      type: mockDataConfiguratorType,
    };

    dataTransformerConfigurator.resolve.mockReturnValue(mockTransformerValue);
    const serviceValue = service.resolve(mockConfig, injector);

    expect(dataTransformerConfigurator.resolve).toHaveBeenCalledWith(injector);
    expect(serviceValue).toBe(mockTransformerValue);
  });

  it('resolve method find the DataTransformerConfigurator based on the type from DataTransformerConfiguratorTypesToken, if no DataTransformerConfigurator found - throw an error', () => {
    const mockConfig = {
      type: 'invalidType',
    };

    expect(() => {
      service.resolve(mockConfig, injector);
    }).toThrow();
  });
});
