import { TestBed } from '@angular/core/testing';
import { DataTransformerService } from '@spryker/data-transformer';

import { DatasourceModule } from './datasource.module';
import { DatasourceService } from './datasource.service';
import { of } from 'rxjs';

const mockDatasourceType = 'mockDatasourceType';

class MockDatasource {
  resolve = jest.fn();
}

class MockInjector {
  get = jest.fn();
}

class MockDataTransformerService {
  transform = jest.fn();
}

describe('DatasourceService', () => {
  let service: DatasourceService;
  let datasource: MockDatasource;
  let injector: MockInjector;
  let dataTransformerService: MockDataTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DatasourceModule.withDatasources({
          [mockDatasourceType]: MockDatasource,
        } as any),
      ],
      providers: [
        MockDatasource,
        MockInjector,
        MockDataTransformerService,
        {
          provide: DataTransformerService,
          useExisting: MockDataTransformerService,
        },
      ],
    });
    service = TestBed.inject(DatasourceService);
    datasource = TestBed.inject(MockDatasource);
    injector = TestBed.inject(MockInjector);
    dataTransformerService = TestBed.inject(MockDataTransformerService);
  });

  it('resolve method returns the result from call DataTransformer.transform() `data`, `config` and injector when data comes from Datasource.resolve() with arguments', () => {
    const mockDatasourceValue = 'mockDatasourceValue';
    const mockContext = 'mockContext';
    const mockConfig = {
      type: mockDatasourceType,
      transform: {
        type: 'test',
      },
    };
    const callback = jest.fn();
    const mockDataSourceReturnValue = 'mockDataSourceReturnValue';

    datasource.resolve.mockReturnValue(of(mockDataSourceReturnValue));
    dataTransformerService.transform.mockReturnValue(of(mockDatasourceValue));
    injector.get.mockReturnValue(datasource);

    const serviceObservable$ = service.resolve(
      injector,
      mockConfig,
      mockContext,
    );

    serviceObservable$.subscribe(callback);

    expect(datasource.resolve).toHaveBeenCalledWith(
      injector,
      mockConfig,
      mockContext,
    );
    expect(dataTransformerService.transform).toHaveBeenCalledWith(
      mockDataSourceReturnValue,
      mockConfig.transform,
      injector,
    );
    expect(callback).toHaveBeenCalledWith(mockDatasourceValue);
  });

  it('transform method find the DataTransformer based on the config.type from DataTransformerTypesToken, if no DataTransformer found - throw an error', () => {
    const mockContext = 'mockContext';
    const mockConfig = {
      type: 'invalidType',
      transform: {
        type: 'test',
      },
    };

    expect(() => {
      service.resolve(injector, mockConfig, mockContext);
    }).toThrow();
  });
});
