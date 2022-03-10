import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotificationService, NotificationType } from '@spryker/notification';
import { ContextService } from '@spryker/utils';

import { NotificationActionHandlerService } from './notification-action-handler.service';

const mockActionsConfig = {
  type: 'notification',
  notifications: [
    {
      type: NotificationType.Info,
      title: 'Notification title 1',
      description: 'Notification description 1',
      closeable: true,
    },
    {
      type: NotificationType.Success,
      title: 'Notification title 2',
      closeable: false,
    },
  ],
};
const mockContext = 'mockContext';

@Injectable()
class MockInjector {
  get = jest.fn();
}

@Injectable()
class MockNotificationService {
  show = jest.fn();
}

const mockInterpolate = (value: string) => `Interpolated${value}`;

@Injectable()
class MockContextService {
  interpolate = jest.fn().mockImplementation(mockInterpolate);
}

describe('NotificationActionHandlerService', () => {
  let service: NotificationActionHandlerService;
  let injector: MockInjector;
  let notificationService: MockNotificationService;
  let contextService: MockContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockNotificationService,
        MockContextService,
        MockInjector,
        {
          provide: NotificationService,
          useExisting: MockNotificationService,
        },
        {
          provide: ContextService,
          useExisting: MockContextService,
        },
      ],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(NotificationActionHandlerService);
    injector = TestBed.inject(MockInjector);
    contextService = TestBed.inject(MockContextService);
    notificationService = TestBed.inject(MockNotificationService);

    injector.get.mockImplementation((instance) => {
      if (instance.toString() === ContextService.toString()) {
        return contextService;
      }

      if (instance.toString() === NotificationService.toString()) {
        return notificationService;
      }
    });
  });

  it('should call `ContextService.interpolate` for every NotificationData.title and NotificationData.description in config.notifications', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    for (const notificationData of mockActionsConfig.notifications) {
      expect(contextService.interpolate).toHaveBeenCalledWith(
        notificationData.title,
        mockContext,
      );

      if (notificationData.description) {
        expect(contextService.interpolate).toHaveBeenCalledWith(
          notificationData.description,
          mockContext,
        );
      }
    }
  });

  it('should call `NotificationService.show` with argument interpolated NotificationData for every NotificationData in config.notifications', () => {
    service.handleAction(injector, mockActionsConfig, mockContext);

    for (const data of mockActionsConfig.notifications) {
      const notificationData = { ...data };

      notificationData.title = mockInterpolate(notificationData.title);

      if (notificationData.description) {
        notificationData.description = mockInterpolate(
          notificationData.description,
        );
      }

      expect(notificationService.show).toHaveBeenCalledWith(notificationData);
    }
  });

  it('should return stream of `NotificationService.show` result of mapped config.notifications', () => {
    const callback = jest.fn();
    const expectedResult = [];
    const mockNotificationServiceReturnValue =
      'mockNotificationServiceReturnValue';

    notificationService.show.mockReturnValue(
      mockNotificationServiceReturnValue,
    );

    const notificationActionService$ = service.handleAction(
      injector,
      mockActionsConfig,
      mockContext,
    );

    for (const data of mockActionsConfig.notifications) {
      expectedResult.push(mockNotificationServiceReturnValue);
    }

    notificationActionService$.subscribe(callback);

    expect(callback).toHaveBeenCalledWith(expectedResult);
  });
});
