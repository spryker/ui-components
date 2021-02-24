import { TestBed } from '@angular/core/testing';

import { DataTransformerFilterService } from './data-transformer-filter.service';
import { DataTransformerFilterModule } from './data-transformer-filter.module';

const mockFilterType = 'mockFilterType';

class MockDataTransformerFilter {
  filter = jest.fn();
}

describe('DataTransformerFilterService', () => {
  let service: DataTransformerFilterService;
  let dataTransformerFilter: MockDataTransformerFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataTransformerFilterModule.withFilters({
          [mockFilterType]: MockDataTransformerFilter,
        }),
      ],
      providers: [MockDataTransformerFilter],
    });

    service = TestBed.inject(DataTransformerFilterService);
    dataTransformerFilter = TestBed.inject(MockDataTransformerFilter);
  });

  it('filter method returns the result from call DataTransformerFilter.filter() with proper arguments', () => {
    const mockData = [{ mockData: 'mockData' }];
    const mockOptions = {
      type: 'type',
      propNames: ['value'],
    };
    const mockByValue = ['value'];
    const mockByValueTransformer = { test: 'value' };
    const mockTransformerValue = 'mockTransformerValue';

    dataTransformerFilter.filter.mockReturnValue(mockTransformerValue);

    const serviceValue = service.filter(
      mockFilterType,
      mockData,
      mockOptions,
      mockByValue,
      mockByValueTransformer,
    );

    expect(dataTransformerFilter.filter).toHaveBeenCalledWith(
      mockData,
      mockOptions,
      mockByValue,
      mockByValueTransformer,
    );
    expect(serviceValue).toBe(mockTransformerValue);
  });

  it('filter method find the DataTransformerFilter based on the type from DataTransformerFiltersTypesToken, if no DataTransformerFilter found - throw an error', () => {
    const mockData = [{ mockData: 'mockData' }];
    const mockType = 'invalidType';
    const mockOptions = {
      type: 'type',
      propNames: ['value'],
    };
    const mockByValue = ['value'];
    const mockByValueTransformer = { test: 'value' };

    expect(() => {
      service.filter(
        mockType,
        mockData,
        mockOptions,
        mockByValue,
        mockByValueTransformer,
      );
    }).toThrow();
  });
});
