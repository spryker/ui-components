import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationService } from '../notification.service';
import { NotificationComponent } from './notification.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

describe('NotificationWrapperComponent', () => {
  let notificationService: NotificationService;
  const mockedType: any = 'mockedType';
  const mockedClosable = true;
  const mockedConfig: any = { position: 'topLeft' };
  const mockedTitle = 'mockedTitle';
  const mockedDescription = 'mockedDescription';

  class MockNotificationService {
    show = jest.fn();
  }

  const { testModule, createComponent } = getTestingForComponent(
    NotificationComponent,
    {
      ngModule: {
        schemas: [NO_ERRORS_SCHEMA],
      },
      projectContent: `
        <span title>mockedTitle</span>
        <span description>mockedDescription</span>
      `,
    },
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [testModule],
      providers: [
        MockNotificationService,
        {
          provide: NotificationService,
          useExisting: MockNotificationService,
        },
      ],
    });
    notificationService = TestBed.inject(NotificationService);
  });

  describe('NonFloating', () => {
    it('should render <spy-notification-view>', async () => {
      const host = await createComponent(
        {
          floating: false,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      expect(notificationElem).toBeTruthy();
    });

    it('should bound `@Input(type)` to the input `type` of <spy-notification-view> component', async () => {
      const host = await createComponent(
        {
          floating: false,
          type: mockedType,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      expect(notificationElem?.properties.type).toBe(mockedType);
    });

    it('should bound `@Input(closeable)` to the input `closeable` of <spy-notification-view> component', async () => {
      const host = await createComponent(
        {
          floating: false,
          closeable: mockedClosable,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      expect(notificationElem?.properties.closeable).toBe(mockedClosable);
    });

    it('should render `title` in the `spy-notification-view` component', async () => {
      const host = await createComponent(
        {
          floating: false,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      expect(notificationElem?.nativeElement.textContent).toContain(
        mockedTitle,
      );
    });

    it('should render `description` in the <spy-notification-view> component', async () => {
      const host = await createComponent(
        {
          floating: false,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      expect(notificationElem?.nativeElement.textContent).toContain(
        mockedDescription,
      );
    });

    it('should trigger `closed` callback when `closed` from <spy-notification-view> was triggered', async () => {
      const host = await createComponent(
        {
          floating: false,
        },
        true,
      );
      const notificationElem = host.queryCss('spy-notification-view');

      notificationElem?.triggerEventHandler('closed', null);

      expect(host.hostComponent.closed).toHaveBeenCalled();
    });
  });

  describe('Floating', () => {
    // TODO fix unit test
    xit('should call `NotificationService.show` with appropriate data if `floating` is `true` and does not render <spy-notification-view>', async () => {
      const host = await createComponent(
        {
          type: mockedType,
          closeable: mockedClosable,
          floatingConfig: mockedConfig,
        },
        true,
      );
      const data = {
        ...mockedConfig,
        description: mockedDescription,
        type: mockedType,
        title: mockedTitle,
        closeable: mockedClosable,
      };
      const notificationElem = host.queryCss('spy-notification-view');
      host.component.ngAfterViewInit();
      host.detectChanges();

      expect(notificationService.show).toHaveBeenCalledWith(data);
      expect(notificationElem).toBeFalsy();
    });
  });
});
