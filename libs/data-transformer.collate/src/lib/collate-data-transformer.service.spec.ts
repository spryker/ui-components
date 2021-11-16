import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { CollateDataTransformerService } from './collate-data-transformer.service';
import { DataTransformerConfiguratorService } from './data-transformer-configurator.service';
import { DataTransformerFilterService } from './data-transformer-filter.service';

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

class MockDataTransformerFilterService {
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

class MockDataTransformerConfiguratorService {
  resolve = jest.fn();
}

const mockInjector = {} as any;

describe('CollateDataTransformerService', () => {
  let service: CollateDataTransformerService;
  let dataTransformerConfiguratorService: MockDataTransformerConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockDataTransformerFilterService,
        MockDataTransformerConfiguratorService,
        {
          provide: DataTransformerFilterService,
          useExisting: MockDataTransformerFilterService,
        },
        {
          provide: DataTransformerConfiguratorService,
          useExisting: MockDataTransformerConfiguratorService,
        },
      ],
    });
    service = TestBed.inject(CollateDataTransformerService);
    dataTransformerConfiguratorService = TestBed.inject(
      MockDataTransformerConfiguratorService,
    );
  });

  it('transform should return filtered data by props returned from DataTransformerConfiguratorService', fakeAsync(() => {
    const mockTransformerReturnData = {
      filter: {
        [mockIdFilter]: '2',
        [mockAnotherIdFilter]: '2',
      },
      search: 'test',
      page: 3,
      pageSize: 2,
    };
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
    } as any;
    const callback = jest.fn();

    dataTransformerConfiguratorService.resolve.mockReturnValue(
      of(mockTransformerReturnData),
    );

    const serviceObservable$ = service.transform(
      mockData,
      mockConfig,
      mockInjector,
    );

    serviceObservable$.subscribe(callback);

    tick();

    expect(callback).toHaveBeenCalledWith({
      data: [mockData[0]],
      page: mockTransformerReturnData.page,
      pageSize: mockTransformerReturnData.pageSize,
      total: 1,
    });
  }));

  it('transform should return updated data when CollateDataConfiguratorService has been emit', fakeAsync(() => {
    const mockTransformerReturnData = {
      page: 3,
      pageSize: 10,
    };
    const mockConfig = {
      type: 'data-manipulator',
      configurator: {
        type: 'table-data',
      },
    } as any;
    const callback = jest.fn();
    const mockDataTransformerConfiguratorData$ = new BehaviorSubject(
      mockTransformerReturnData,
    );

    dataTransformerConfiguratorService.resolve.mockReturnValue(
      mockDataTransformerConfiguratorData$,
    );

    const serviceObservable$ = service.transform(
      mockData,
      mockConfig,
      mockInjector,
    );

    serviceObservable$.subscribe(callback);

    tick();

    expect(callback).toHaveBeenCalledWith({
      data: mockData,
      page: mockTransformerReturnData.page,
      pageSize: mockTransformerReturnData.pageSize,
      total: mockData.length,
    });

    mockTransformerReturnData.pageSize = 10;
    mockTransformerReturnData.page = 1;

    mockDataTransformerConfiguratorData$.next(mockTransformerReturnData);
    tick();

    expect(callback).toHaveBeenCalledWith({
      data: mockData,
      page: mockTransformerReturnData.page,
      pageSize: mockTransformerReturnData.pageSize,
      total: mockData.length,
    });
  }));
});
