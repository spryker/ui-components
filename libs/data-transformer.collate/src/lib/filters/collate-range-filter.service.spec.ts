import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';
import { of } from 'rxjs';

import { CollateRangeFilter } from './collate-range-filter.service';

class MockDataTransformer {
  transform = jest.fn().mockReturnValue(of('col 1'));
}

describe('CollateRangeFilter', () => {
  let service: CollateRangeFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockDataTransformer,
        {
          provide: DataTransformerService,
          useExisting: MockDataTransformer,
        },
      ],
    });

    service = TestBed.inject(CollateRangeFilter);
  });

  it('filter method returns filtered data by value that is in range with the prop value.', () => {
    const mockData = [
      {
        col1: 1,
        col2: 'col 2',
        col3: '1499916808000',
        col4: '1499916808000',
      },
      {
        col1: 2,
        col2: 'col 1v',
        col3: '1600780808000',
        col4: '1600780808000',
      },
    ];
    const mockOptions = {
      type: 'text',
      propNames: ['col3', 'col4'],
    };
    const mockByValue = [
      {
        from: '1599916808000',
        to: '1601299208000',
      },
    ];
    const mockTransformerByPropName = {};
    const callback = jest.fn();

    const serviceObservable$ = service.filter(
      mockData,
      mockOptions,
      mockByValue,
      mockTransformerByPropName,
    );

    serviceObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith([mockData[1]]);
  });
});
