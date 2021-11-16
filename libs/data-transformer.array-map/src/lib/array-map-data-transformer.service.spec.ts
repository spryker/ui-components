import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';

import { ArrayMapDataTransformerService } from './array-map-data-transformer.service';
import { of } from 'rxjs';

const mockReturnedValue = 'mockReturnValue';

class MockDataTransformerService {
  transform = jest.fn().mockReturnValue(of(mockReturnedValue));
}

describe('ArrayMapDataTransformerService', () => {
  let service: ArrayMapDataTransformerService;
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
    service = TestBed.inject(ArrayMapDataTransformerService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('transform method should map array and return transformed array with transformed value by config prop', () => {
    const mockConfig = {
      type: 'type',
      mapItems: {
        type: 'type',
      },
    } as any;
    const mockData = ['data', 'newdata', '1data'];
    const mockReturnedData = mockData.map(() => mockReturnedValue);
    const callback = jest.fn();
    const transformObservable$ = service.transform(mockData, mockConfig);

    transformObservable$.subscribe(callback);

    mockData.forEach((item) => {
      expect(dataTransformerService.transform).toBeCalledWith(
        item,
        mockConfig.mapItems,
      );
    });
    expect(callback).toHaveBeenCalledWith(mockReturnedData);
    expect(dataTransformerService.transform).toBeCalledTimes(mockData.length);
  });
});
