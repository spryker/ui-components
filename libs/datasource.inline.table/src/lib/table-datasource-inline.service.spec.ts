import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';
import { of } from 'rxjs';

import { TableDatasourceInlineService } from './table-datasource-inline.service';

class MockDataTransformerService {
  transform = jest.fn();
}

describe('TableDatasourceInlineService', () => {
  let service: TableDatasourceInlineService;
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
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(TableDatasourceInlineService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('resolve method should return value from DataTransformerService.transform', () => {
    const mockConfig = {
      type: 'table.inline',
      data: [
        {
          col1: '2020-09-24T15:20:08+02:00',
          col2: 'col 2',
        },
        {
          col1: '2020-09-22T15:20:08+02:00',
          col2: 'col 1v',
        },
      ],
      filter: {
        date: {
          type: 'range',
          propNames: 'col1',
        },
      },
      search: {
        type: 'text',
        propNames: ['col2'],
      },
      transformerByPropName: {
        col1: 'date',
      },
    } as any;
    const mockTransformersConfig = {
      type: 'chain',
      transformers: [
        {
          type: 'array-map',
          mapItems: {
            type: 'object-map',
            mapProps: {
              col1: {
                type: 'date-parse',
              },
            },
          },
        },
        {
          type: 'collate',
          configurator: {
            type: 'table',
          },
          filter: mockConfig.filter,
          search: mockConfig.search,
        },
        {
          type: 'lens',
          path: 'data',
          transformer: {
            type: 'array-map',
            mapItems: {
              type: 'object-map',
              mapProps: {
                col1: {
                  type: 'date-serialize',
                },
              },
            },
          },
        },
      ],
      transformerByPropName: mockConfig.transformerByPropName,
    };
    const mockReturnedValue = 'mockReturnedValue';
    const mockInjector = {} as any;
    const callback = jest.fn();

    dataTransformerService.transform.mockReturnValue(of(mockReturnedValue));

    const serviceObservable$ = service.resolve(mockInjector, mockConfig);

    serviceObservable$.subscribe(callback);

    expect(dataTransformerService.transform).toHaveBeenCalledWith(
      mockConfig.data,
      mockTransformersConfig,
      mockInjector,
    );
    expect(callback).toHaveBeenCalledWith(mockReturnedValue);
  });
});
