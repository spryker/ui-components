import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AjaxActionService } from '@spryker/ajax-action';

import { TableUrlActionHandlerModule } from './table-url-action-handler.module';
import { TableUrlActionHandlerService } from './table-url-action-handler.service';

const mockActionEvent: any = {
  action: {
    id: 'click',
    title: 'test-click',
    type: 'url',
    typeOptions: {
      url: '/mock-url?col',
    },
  },
  items: [
    {
      col: 'col1',
    },
  ],
};

class MockAjaxActionService {
  handle = jest.fn();
}

describe('TableUrlActionHandlerComponent', () => {
  let ajaxActionService: AjaxActionService;
  let tableUrlActionHandlerService: TableUrlActionHandlerService;
  let injector: Injector;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableUrlActionHandlerModule, HttpClientTestingModule],
      providers: [
        TableUrlActionHandlerService,
        MockAjaxActionService,
        {
          provide: AjaxActionService,
          useExisting: MockAjaxActionService,
        },
      ],
    });

    ajaxActionService = TestBed.inject(AjaxActionService);
    tableUrlActionHandlerService = TestBed.inject(TableUrlActionHandlerService);
    injector = TestBed.inject(Injector);
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send request to the url from `actionEvent` prop with default `GET` method if it does not exist', () => {
    tableUrlActionHandlerService.handleAction(mockActionEvent, injector);
    const htmlResponse = httpTestingController.expectOne(
      mockActionEvent.action.typeOptions.url,
    );

    expect(htmlResponse.request.method).toBe('GET');
  });

  it('should send request to the url and method from `actionEvent` prop', () => {
    const mockMethod = 'POST';
    const mockActionEventWithMethod = {
      ...mockActionEvent,
      action: {
        ...mockActionEvent.action,
        typeOptions: {
          ...mockActionEvent.action.typeOptions,
          method: mockMethod,
        },
      },
    };
    tableUrlActionHandlerService.handleAction(
      mockActionEventWithMethod,
      injector,
    );
    const htmlResponse = httpTestingController.expectOne(
      mockActionEvent.action.typeOptions.url,
    );

    expect(htmlResponse.request.method).toBe(mockMethod);
  });

  it('should invoke `ajaxActionService.handle` with data from response and custom injector', () => {
    const mockResponse = {
      notifications: [
        {
          type: 'info',
          message: 'message',
        },
      ],
    };

    tableUrlActionHandlerService.handleAction(mockActionEvent, injector);
    const htmlResponse = httpTestingController.expectOne(
      mockActionEvent.action.typeOptions.url,
    );

    htmlResponse.flush(mockResponse);

    expect(ajaxActionService.handle).toHaveBeenCalledWith(
      mockResponse,
      injector,
    );
  });
});
