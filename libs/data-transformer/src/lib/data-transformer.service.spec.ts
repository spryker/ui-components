import { TestBed } from '@angular/core/testing';

import { DataTransformerModule } from './data-transformer.module';
import { DataTransformerService } from './data-transformer.service';
import { Injector } from '@angular/core';

const mockTransformerType = 'mockTransformerType';

class MockDataTransformer {
  transform = jest.fn();
}

describe('DataTransformerService', () => {
  let service: DataTransformerService;
  let dataTransformer: MockDataTransformer;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTransformerModule.withTransformers({
          [mockTransformerType]: MockDataTransformer,
        }),
      ],
      providers: [MockDataTransformer],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(DataTransformerService);
    dataTransformer = TestBed.inject(MockDataTransformer);
    injector = TestBed.inject(Injector);
  });

  it('transform method returns the result from call DataTransformer.transform() with arguments `data` and `config`', () => {
    const mockTransformerValue = 'mockTransformerValue';
    const mockData = 'mockData';
    const mockConfig = {
      type: mockTransformerType,
    };

    dataTransformer.transform.mockReturnValue(mockTransformerValue);
    const serviceValue = service.transform(mockData, mockConfig, injector);

    expect(dataTransformer.transform).toHaveBeenCalledWith(
      mockData,
      mockConfig,
      injector,
    );
    expect(serviceValue).toBe(mockTransformerValue);
  });

  it('transform method find the DataTransformer based on the config.type from DataTransformerTypesToken, if no DataTransformer found - throw an error', () => {
    const mockData = 'mockData';
    const mockConfig = {
      type: 'invalidType',
    };

    expect(() => {
      service.transform(mockData, mockConfig);
    }).toThrow();
  });
});
