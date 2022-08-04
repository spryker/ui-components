import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ActionsService } from '@spryker/actions';
import { ContextService } from '@spryker/utils';

import { HttpActionHandlerService } from './http-action-handler.service';

const mockActionsConfig = {
  type: 'http',
  url: 'mockUrl',
};
const mockContext = 'mockContext';
const mockResponse = {
  actions: [
    {
      type: 'type_actions',
      message: 'message',
    },
    {
      type: 'type_actions_second',
      message: 'message',
    },
  ],
};

@Injectable()
class MockActionsServiceService {
  trigger = jest.fn();
}

@Injectable()
class MockInjector {
  get = jest.fn();
}

@Injectable()
class MockContextService {
  interpolate = jest.fn().mockImplementation((d) => d);
}

describe('HttpActionHandlerService', () => {
  let service: HttpActionHandlerService;
  let injector: MockInjector;
  let actionsService: MockActionsServiceService;
  let contextService: MockContextService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MockActionsServiceService,
        MockInjector,
        MockContextService,
        {
          provide: ActionsService,
          useExisting: MockActionsServiceService,
        },
        {
          provide: ContextService,
          useExisting: MockContextService,
        },
      ],
      teardown: { destroyAfterEach: false },
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpActionHandlerService);
    injector = TestBed.inject(MockInjector);
    contextService = TestBed.inject(MockContextService);
    actionsService = TestBed.inject(MockActionsServiceService);

    injector.get.mockImplementation((instance) => {
      if (instance.toString() === ContextService.toString()) {
        return contextService;
      }

      if (instance.toString() === ActionsService.toString()) {
        return actionsService;
      }
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should process config.url via ContextService.interpolate()', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);
    httpTestingController.expectOne(mockActionsConfig.url);

    expect(contextService.interpolate).toHaveBeenCalledWith(
      mockActionsConfig.url,
      mockContext,
    );
  });

  it('should send request to the url from `config` prop with default `GET` method if it does not exist', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);
    const httpResponse = httpTestingController.expectOne(mockActionsConfig.url);

    expect(httpResponse.request.method).toBe('GET');
  });

  it('should send request to the url from `config` using method from `config` prop', () => {
    const mockActionsConfigWithMethod = {
      ...mockActionsConfig,
      method: 'POST',
    };

    service.handleAction(injector, mockActionsConfigWithMethod, mockContext);
    const httpResponse = httpTestingController.expectOne(
      mockActionsConfigWithMethod.url,
    );

    expect(httpResponse.request.method).toBe(
      mockActionsConfigWithMethod.method,
    );
  });

  it('should invoke `ActionsService.trigger` for every ActionConfig from HttpActionResponse.actions with arguments injector and ActionConfig and context', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);
    const httpResponse = httpTestingController.expectOne(mockActionsConfig.url);

    httpResponse.flush(mockResponse);

    for (let i = 0; i < mockResponse.actions.length; i++) {
      expect(actionsService.trigger).toHaveBeenCalledWith(
        injector,
        mockResponse.actions[0],
        mockContext,
      );
    }
  });

  it('should return stream that emits when HTTP request finishes', fakeAsync(() => {
    const callback = jest.fn();
    const httpActionsService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );
    const httpResponse = httpTestingController.expectOne(mockActionsConfig.url);

    httpResponse.flush(mockResponse);
    httpActionsService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(mockResponse);
  }));
});
