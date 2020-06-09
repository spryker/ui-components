import { TestBed } from '@angular/core/testing';
import { AjaxActionModule } from './ajax-action.module';
import { AjaxActionService } from './ajax-action.service';
import { AjaxPostActionRedirect } from '../../post-actions/src/ajax-post-action-redirect';
import { NotificationService } from '@spryker/notification';
import { Injector } from '@angular/core';

const mockPostActionsType = 'mock';

const mockPostActions = {
  type: mockPostActionsType,
};

const mockNotificationsType = 'info';
const mockNotificationsMessage = 'value';

const mockNotifications = [
  {
    type: mockNotificationsType as any,
    message: mockNotificationsMessage,
  },
];

const mockNotificationsForProp = {
  type: mockNotificationsType as any,
  title: mockNotificationsMessage,
};

class MockAjaxPostActionService {
  handleAction = jest.fn();
}

class MockNotificationService {
  show = jest.fn();
}

describe('AjaxActionService', () => {
  let actionService: AjaxActionService;
  let notificationService: NotificationService;
  let postActionService: MockAjaxPostActionService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AjaxActionModule.withActions({
          [mockPostActionsType]: MockAjaxPostActionService,
        }),
      ],
      providers: [
        AjaxActionService,
        MockAjaxPostActionService,
        MockNotificationService,
        {
          provide: NotificationService,
          useExisting: MockNotificationService,
        },
      ],
    });
    actionService = TestBed.inject(AjaxActionService);
    notificationService = TestBed.inject(NotificationService);
    postActionService = TestBed.inject(MockAjaxPostActionService);
    injector = TestBed.inject(Injector);
  });

  it('should call `notificationService` if `notifications` key exists', () => {
    const mockResponse = {
      notifications: mockNotifications,
    };

    actionService.handle(mockResponse);

    expect(notificationService.show).toHaveBeenCalledWith(
      mockNotificationsForProp,
    );
  });

  it('should not call `notificationService` if `notifications` key does exists', () => {
    const mockResponse = {};

    actionService.handle(mockResponse);

    expect(notificationService.show).not.toHaveBeenCalled();
  });

  it('should call appropriate post action if type exist in the tokens with data and default injector', () => {
    const mockResponse = {
      postAction: mockPostActions,
    };

    actionService.handle(mockResponse);

    expect(postActionService.handleAction).toHaveBeenCalledWith(
      mockPostActions,
      injector,
    );
  });

  it('should call appropriate post action if type exist in the tokens with data and custom injector', () => {
    const mockResponse = {
      postAction: mockPostActions,
    };
    const mockInjector = {} as any;

    actionService.handle(mockResponse, mockInjector);

    expect(postActionService.handleAction).toHaveBeenCalledWith(
      mockPostActions,
      mockInjector,
    );
  });

  it('should throw an error if post action type does not exist', () => {
    const mockResponse = {
      postAction: {
        type: 'invalid',
      },
    };

    expect(() => {
      actionService.handle(mockResponse, injector);
    }).toThrow();
  });
});
