import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NotificationService } from '../notification.service';
import { NotificationComponent } from './notification.component';

const mockedType: any = 'mockedType';
const mockedClosable = true;
const mockedConfig: any = { position: 'topLeft' };
const mockedTitle = 'mockedTitle';
const mockedDescription = 'mockedDescription';

class MockNotificationRef {
    afterClose$ = new Subject<void>();

    afterClose = jest.fn().mockReturnValue(this.afterClose$);
    close = jest.fn();
}

class MockNotificationService {
    notificationRef = new MockNotificationRef();

    show = jest.fn().mockReturnValue(this.notificationRef);
}

describe('NotificationWrapperComponent', () => {
    let notificationService: MockNotificationService;

    const { testModule, createComponent } = getTestingForComponent(NotificationComponent, {
        ngModule: {
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: `
        <span title>mockedTitle</span>
        <span description>mockedDescription</span>
      `,
    });

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
            teardown: { destroyAfterEach: false },
        });

        notificationService = TestBed.inject(MockNotificationService);
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

        it('should bind `@Input(floating)` to `false` of <spy-notification-view> component', async () => {
            const host = await createComponent(
                {
                    floating: false,
                    closeable: mockedClosable,
                },
                true,
            );
            const notificationElem = host.queryCss('spy-notification-view');

            expect(notificationElem?.properties.floating).toBe(false);
        });

        it('should render `title` in the `spy-notification-view` component', async () => {
            const host = await createComponent(
                {
                    floating: false,
                },
                true,
            );
            const notificationElem = host.queryCss('spy-notification-view');

            expect(notificationElem?.nativeElement.textContent).toContain(mockedTitle);
        });

        it('should render `description` in the <spy-notification-view> component', async () => {
            const host = await createComponent(
                {
                    floating: false,
                },
                true,
            );
            const notificationElem = host.queryCss('spy-notification-view');

            expect(notificationElem?.nativeElement.textContent).toContain(mockedDescription);
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

        it('should invoke `notificationViewComponent.close` if method `close` has been executed', async () => {
            const host = await createComponent(
                {
                    floating: false,
                },
                true,
            );
            const notificationElem = host.queryCss('spy-notification-view');

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            notificationElem!.componentInstance.close = jest.fn();
            host.component.close();

            expect(notificationElem?.componentInstance.close).toHaveBeenCalled();
        });
    });

    describe('Floating', () => {
        it('should call `NotificationService.show` with appropriate data if `floating` is `true` and does not render <spy-notification-view>', async () => {
            const host = await createComponent(
                {
                    floating: true,
                    type: mockedType,
                    closeable: mockedClosable,
                    floatingConfig: mockedConfig,
                },
                true,
            );
            const notificationElem = host.queryCss('spy-notification-view');

            expect(notificationService.show).toHaveBeenCalledWith(
                expect.objectContaining({
                    ...mockedConfig,
                    type: mockedType,
                    closeable: mockedClosable,
                }),
            );
            expect(notificationElem).toBeFalsy();
        });

        it('should emit `closed` if `notificationRef.afterClose` has been invoked', async () => {
            const host = await createComponent(
                {
                    floating: true,
                    type: mockedType,
                    closeable: mockedClosable,
                    floatingConfig: mockedConfig,
                },
                true,
            );

            notificationService.notificationRef.afterClose$.next();

            expect(host.hostComponent.closed).toHaveBeenCalled();
        });

        it('should invoke `notificationRef.close` if method `close` has been executed', async () => {
            const host = await createComponent(
                {
                    floating: true,
                    type: mockedType,
                    closeable: mockedClosable,
                    floatingConfig: mockedConfig,
                },
                true,
            );

            host.component.close();

            expect(notificationService.notificationRef.close).toHaveBeenCalled();
        });
    });
});
