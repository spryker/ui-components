import { TestBed } from '@angular/core/testing';
import {
  DataTransformerConfig,
  DataTransformerService,
} from '@spryker/data-transformer';
import { of } from 'rxjs';

import { ObjectMapDataTransformerService } from './object-map-data-transformer.service';

const mockTestTypeTransformerConfig = {
  type: 'mockTestTypeTransformer',
  returnValue: 'mockTestReturnedValue',
  propValue: 'test',
};
const mockAnotherTestTypeTransformerConfig = {
  type: 'mockAnotherTestTypeTransformer',
  returnValue: 'mockAnotherTestReturnedValue',
  propValue: 'anotherTest',
};
const mockConfig = {
  type: 'type',
  mapProps: {
    [mockTestTypeTransformerConfig.propValue]: {
      type: mockTestTypeTransformerConfig.type,
    },
    [mockAnotherTestTypeTransformerConfig.propValue]: {
      type: mockAnotherTestTypeTransformerConfig.type,
    },
  },
} as any;

class MockDataTransformerService {
  transform = jest
    .fn()
    .mockImplementation((value: string, config: DataTransformerConfig) => {
      if (config.type === mockTestTypeTransformerConfig.type) {
        return of(mockTestTypeTransformerConfig.returnValue);
      }

      if (config.type === mockAnotherTestTypeTransformerConfig.type) {
        return of(mockAnotherTestTypeTransformerConfig.returnValue);
      }

      return of(value);
    });
}

describe('ObjectMapDataTransformerService', () => {
  let service: ObjectMapDataTransformerService;
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
    service = TestBed.inject(ObjectMapDataTransformerService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('transform method should map object and return transformed object with transformed value by config prop', () => {
    const mockData = {
      [mockTestTypeTransformerConfig.propValue]: 'value',
      [mockAnotherTestTypeTransformerConfig.propValue]: 'value2',
      unchanged: 'unchanged',
    };
    const mockReturnedData = {
      [mockTestTypeTransformerConfig.propValue]:
        mockTestTypeTransformerConfig.returnValue,
      [mockAnotherTestTypeTransformerConfig.propValue]:
        mockAnotherTestTypeTransformerConfig.returnValue,
      unchanged: 'unchanged',
    };
    const callback = jest.fn();
    const transformObservable$ = service.transform(mockData, mockConfig);

    transformObservable$.subscribe(callback);

    Object.entries(mockData).forEach(([key, item]) => {
      if (!mockConfig.mapProps.hasOwnProperty(key)) {
        return;
      }

      expect(dataTransformerService.transform).toBeCalledWith(
        item,
        mockConfig.mapProps[key],
      );
    });
    expect(callback).toHaveBeenCalledWith(mockReturnedData);
  });
});
