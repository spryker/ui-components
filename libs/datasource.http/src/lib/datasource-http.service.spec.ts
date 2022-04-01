import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CacheService } from '@spryker/cache';
import { DataSerializerService } from '@spryker/data-serializer';
import {
  DefaultContextSerializationModule,
  DiEncodingCodecToken,
} from '@spryker/utils';

import { DatasourceHttpService } from './datasource-http.service';
import { DatasourceHttpRequestToken } from './token';
import { DatasourceHttpConfig, DatasourceHttpConfigDataIn } from './types';

class MockDataSerializerService {
  serialize = jest.fn();
}

class MockCacheService {
  getCached = jest.fn();
}

class MockEncoder {
  encodeKey = jest.fn().mockImplementation((value) => value);
  encodeValue = jest.fn().mockImplementation((value) => value);
  decodeKey = jest.fn();
  decodeValue = jest.fn();
}

const mockInjector = {} as any;

describe('DatasourceHttpService', () => {
  let service: DatasourceHttpService;
  let cacheService: MockCacheService;
  let dataSerializerService: MockDataSerializerService;
  let httpTestingController: HttpTestingController;
  let mockEncoder: MockEncoder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DefaultContextSerializationModule],
      providers: [
        MockDataSerializerService,
        MockCacheService,
        MockEncoder,
        {
          provide: DataSerializerService,
          useExisting: MockDataSerializerService,
        },
        {
          provide: CacheService,
          useExisting: MockCacheService,
        },
        {
          provide: DiEncodingCodecToken,
          useExisting: MockEncoder,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(DatasourceHttpService);
    cacheService = TestBed.inject(MockCacheService);
    dataSerializerService = TestBed.inject(MockDataSerializerService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockEncoder = TestBed.inject(MockEncoder);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('resolve method should sent request with url and method from config', () => {
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
      method: 'POST',
    };
    const serviceObservable$ = service.resolve(mockInjector, mockConfig);

    serviceObservable$.subscribe();

    const htmlResponse = httpTestingController.expectOne(mockConfig.url);

    expect(htmlResponse.request.method).toBe(mockConfig.method);
  });

  it('resolve method should sent request with url and method `GET` if method does not exist in the config', () => {
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
    };
    const serviceObservable$ = service.resolve(mockInjector, mockConfig);

    serviceObservable$.subscribe();

    const htmlResponse = httpTestingController.expectOne(mockConfig.url);

    expect(htmlResponse.request.method).toBe('GET');
  });

  it('resolve method should sent request with serialized body by `DataSerializerService.serialize` if `config.dataIn === DatasourceHttpConfigDataIn.Body`', () => {
    const mockContextSerialized = 'mockContextSerialized';
    const mockContext = 'mockContext';
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
      dataIn: DatasourceHttpConfigDataIn.Body,
    };

    dataSerializerService.serialize.mockReturnValue(mockContextSerialized);

    const serviceObservable$ = service.resolve(
      mockInjector,
      mockConfig,
      mockContext,
    );

    serviceObservable$.subscribe();

    const htmlResponse = httpTestingController.expectOne(mockConfig.url);

    expect(dataSerializerService.serialize).toBeCalledWith(
      DatasourceHttpRequestToken,
      mockContext,
    );
    expect(htmlResponse.request.body).toBe(mockContextSerialized);
  });

  it('resolve method should sent request with http params by `new HttpParams` if `config.dataIn === DatasourceHttpConfigDataIn.Params`', () => {
    const mockContextSerialized = 'mockContextSerialized';
    const mockContext = {
      prop: 'prop',
      addProp: 'addProp',
    };
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
      dataIn: DatasourceHttpConfigDataIn.Params,
    };
    const serviceObservable$ = service.resolve(
      mockInjector,
      mockConfig,
      mockContext,
    );
    const mockParams = new HttpParams({
      fromObject: mockContext as any, // any values can be used and custom codec supports it
      encoder: mockEncoder,
    });

    serviceObservable$.subscribe();

    const htmlResponse = httpTestingController.expectOne(
      `${mockConfig.url}?${mockParams.toString()}`,
    );

    expect(htmlResponse.request.params).toBeInstanceOf(HttpParams);
    expect(htmlResponse.request.params).toMatchObject(mockParams);
  });

  it('resolve method should return request stream with resolved data', () => {
    const mockResponse = 'mockResponse';
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
      method: 'POST',
    };
    const callback = jest.fn();
    const serviceObservable$ = service.resolve(mockInjector, mockConfig);

    serviceObservable$.subscribe(callback);

    const htmlResponse = httpTestingController.expectOne(mockConfig.url);
    htmlResponse.flush(mockResponse);

    expect(callback).toHaveBeenCalledWith(mockResponse);
  });

  it('resolve method should return `CacheService.getCached()` if `config.cache` is defined', () => {
    const mockResponse = 'mockResponse';
    const mockConfig: DatasourceHttpConfig = {
      type: 'type',
      transform: {
        type: 'type',
      },
      url: 'mockUrl',
      cache: {
        type: 'type',
        namespace: 'namespace',
      },
    };
    cacheService.getCached.mockReturnValue(mockResponse);

    const returnValue = service.resolve(mockInjector, mockConfig);

    expect(cacheService.getCached).toHaveBeenCalled();
    expect(returnValue).toBe(mockResponse);
  });
});
