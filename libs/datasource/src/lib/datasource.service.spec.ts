import { TestBed } from '@angular/core/testing';

import { DatasourceModule } from './datasource.module';
import { DatasourceService } from './datasource.service';

const mockDatasourceType = 'mockDatasourceType';

class MockDatasource {
  resolve = jest.fn();
}

class MockInjector {
  get = jest.fn();
}

describe('DatasourceService', () => {
  let service: DatasourceService;
  let datasource: MockDatasource;
  let injector: MockInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DatasourceModule.withDatasources({
          [mockDatasourceType]: MockDatasource,
        } as any),
      ],
      providers: [MockDatasource, MockInjector],
    });
    service = TestBed.inject(DatasourceService);
    datasource = TestBed.inject(MockDatasource);
    injector = TestBed.inject(MockInjector);
  });

  it('resolve method returns the result from call DataTransformer.transform() with arguments `data` and `config`', () => {
    const mockDatasourceValue = 'mockDatasourceValue';
    const mockContext = 'mockContext';
    const mockConfig = {
      type: mockDatasourceType,
    };

    datasource.resolve.mockReturnValue(mockDatasourceValue);
    injector.get.mockReturnValue(datasource);
    const serviceValue = service.resolve(injector, mockConfig, mockContext);

    expect(datasource.resolve).toHaveBeenCalledWith(
      injector,
      mockConfig,
      mockContext,
    );
    expect(serviceValue).toBe(mockDatasourceValue);
  });

  it('transform method find the DataTransformer based on the config.type from DataTransformerTypesToken, if no DataTransformer found - throw an error', () => {
    const mockContext = 'mockContext';
    const mockConfig = {
      type: 'invalidType',
    };

    expect(() => {
      service.resolve(injector, mockConfig, mockContext);
    }).toThrow();
  });
});
