import { TestBed } from '@angular/core/testing';

import { ChainDataTransformerService } from './chain-data-transformer.service';
import {
  DataTransformerService,
  DataTransformerConfig,
} from '@spryker/data-transformer';
import { of } from 'rxjs';

const mockConfig = {
  type: 'type',
  transformers: [
    {
      type: 'mockTestType',
      value: 'mockTestReturnedValue',
    },
    {
      type: 'mockAnotherTestType',
      value: 'mockAnotherTestReturnedValue',
    },
  ],
};

class MockDataTransformerService {
  transform = jest
    .fn()
    .mockImplementation((value: string, config: DataTransformerConfig) =>
      of(config.value),
    );
}

describe('ChainDataTransformerService', () => {
  let service: ChainDataTransformerService;
  let dataTransformerService: MockDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockDataTransformerService,
        {
          provide: DataTransformerService,
          useExisting: MockDataTransformerService,
        },
      ],
    });
    service = TestBed.inject(ChainDataTransformerService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('transform method should map config and use transformers sequently for data transformation and return result', () => {
    let mockData = 'value';
    const mockInjector = {} as any;
    const callback = jest.fn();
    const transformObservable$ = service.transform(
      mockData,
      mockConfig,
      mockInjector,
    );
    const transformers = mockConfig.transformers;
    const resultValue = transformers[transformers.length - 1].value;
    transformObservable$.subscribe(callback);

    mockConfig.transformers.forEach((config) => {
      expect(dataTransformerService.transform).toBeCalledWith(
        mockData,
        config,
        mockInjector,
      );

      mockData = config.value;
    });
    expect(callback).toHaveBeenCalledWith(resultValue);
  });
});
