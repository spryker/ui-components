import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';

import { DatasourceInlineService } from './datasource-inline.service';

class MockDataTransformerService {
  transform = jest.fn();
}

describe('DatasourceInlineService', () => {
  let service: DatasourceInlineService;
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
    service = TestBed.inject(DatasourceInlineService);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('resolve method should return value of DataTransformerService.transform', () => {
    const mockConfig = {
      type: 'inline',
      data: 'test',
      transform: {
        type: 'test',
      },
    };
    const mockInjector = {} as any;
    const mockReturnedValue = 'mockReturnedValue';

    dataTransformerService.transform.mockReturnValue(mockReturnedValue);

    const returnedValue = service.resolve(mockInjector, mockConfig);

    expect(returnedValue).toBe(mockReturnedValue);
    expect(dataTransformerService.transform).toHaveBeenCalledWith(
      mockConfig.data,
      mockConfig.transform,
      mockInjector,
    );
  });
});
