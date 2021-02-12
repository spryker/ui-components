import { TestBed } from '@angular/core/testing';

import { DataTransformerModule } from './data-transformer.module';
import { DataTransformerService } from './data-transformer.service';

const mockTransformerType = 'mockTransformerType';

class MockDataTransformer {
  transform = jest.fn();
}

describe('DataTransformerService', () => {
  let service: DataTransformerService;
  let dataTransformer: MockDataTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTransformerModule.withTransformers({
          [mockTransformerType]: MockDataTransformer,
        }),
      ],
      providers: [MockDataTransformer],
    });

    service = TestBed.inject(DataTransformerService);
    dataTransformer = TestBed.inject(MockDataTransformer);
  });

  it('transform method returns the result from call DataTransformer.transform() with arguments `data` and `config`', () => {
    const mockTransformerValue = 'mockTransformerValue';
    const mockData = 'mockData';
    const mockConfig = {
      type: mockTransformerType,
    };

    dataTransformer.transform.mockReturnValue(mockTransformerValue);
    const serviceValue = service.transform(mockData, mockConfig);

    expect(dataTransformer.transform).toHaveBeenCalledWith(
      mockData,
      mockConfig,
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
