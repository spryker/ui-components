import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CollateDataConfiguratorService } from './collate-data-configurator.service';
import { CollateDataTransformerService } from './collate-data-transformer.service';
import { CollateFilterService } from './collate-filter.service';

const mockIdFilter = 'idFilter';
const mockAnotherIdFilter = 'mockAnotherIdFilter';

const mockData = [
  {
    col1: 1,
    col2: 'col 2',
    col3: '2020-09-24T15:20:08+02:00',
    col4: '2020-09-24T15:20:08+02:00',
  },
  {
    col1: 2,
    col2: `col v`,
    col3: '2020-09-22T15:20:08+02:00',
    col4: '2020-09-22T15:20:08+02:00',
  },
  {
    col1: 3,
    col2: `col v`,
    col3: '2020-09-22T15:20:08+02:00',
    col4: '2020-09-22T15:20:08+02:00',
  },
];

class MockCollateFilterService {
  filter = jest.fn().mockImplementation((type) => {
    if (type === mockIdFilter) {
      return of([mockData[1]]);
    }

    if (type === mockAnotherIdFilter) {
      return of([mockData[2]]);
    }

    return of([mockData[0]]);
  });
}

class MockCollateDataConfiguratorService {
  resolve = jest.fn().mockReturnValue(
    of({
      filter: {
        [mockIdFilter]: '2',
        [mockAnotherIdFilter]: '2',
      },
      search: 'test',
      page: 3,
      pageSize: 2,
    }),
  );
}

describe('CollateDataTransformerService', () => {
  let service: CollateDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockCollateFilterService,
        MockCollateDataConfiguratorService,
        {
          provide: CollateFilterService,
          useExisting: MockCollateFilterService,
        },
        {
          provide: CollateDataConfiguratorService,
          useExisting: MockCollateDataConfiguratorService,
        },
      ],
    });
    service = TestBed.inject(CollateDataTransformerService);
  });

  it('should transform should return filtered data by props returned from CollateDataConfiguratorService', () => {
    const mockConfig = {
      type: 'data-manipulator',
      configurator: {
        type: 'table-data',
      },
      filter: {
        [mockIdFilter]: {
          type: mockIdFilter,
          propNames: ['col1'],
        },
        [mockAnotherIdFilter]: {
          type: mockAnotherIdFilter,
          propNames: ['col1'],
        },
      },
      search: {
        type: 'text',
        propNames: ['value 1'],
      },
    };
    const callback = jest.fn();
    const serviceObservable$ = service.transform(
      mockData,
      mockConfig,
      {} as any,
    );

    serviceObservable$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith({
      data: [mockData[0]],
      page: 3,
      pageSize: 2,
      total: 1,
    });
  });
});
