import { TestBed } from '@angular/core/testing';

import { CollateFilterService } from './collate-filter.service';
import { CollateDataTransformerModule } from './collate-data-transformer.module';

const mockFilterType = 'mockFilterType';

class MockCollateFilter {
  filter = jest.fn();
}

describe('CollateFilterService', () => {
  let service: CollateFilterService;
  let collateFilter: MockCollateFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CollateDataTransformerModule.withFilters({
          [mockFilterType]: MockCollateFilter,
        }),
      ],
      providers: [MockCollateFilter],
    });

    service = TestBed.inject(CollateFilterService);
    collateFilter = TestBed.inject(MockCollateFilter);
  });

  it('filter method returns the result from call CollateFilter.filter() with proper arguments', () => {
    const mockData = [{ mockData: 'mockData' }];
    const mockOptions = {
      type: 'type',
      propNames: ['value'],
    };
    const mockByValue = ['value'];
    const mockByValueTransformer = { test: 'value' };
    const mockTransformerValue = 'mockTransformerValue';

    collateFilter.filter.mockReturnValue(mockTransformerValue);

    const serviceValue = service.filter(
      mockFilterType,
      mockData,
      mockOptions,
      mockByValue,
      mockByValueTransformer,
    );

    expect(collateFilter.filter).toHaveBeenCalledWith(
      mockData,
      mockOptions,
      mockByValue,
      mockByValueTransformer,
    );
    expect(serviceValue).toBe(mockTransformerValue);
  });

  it('filter method find the CollateFilter based on the type from CollateFiltersTypesToken, if no CollateFilter found - throw an error', () => {
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
