import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { createComponentWrapper } from '@spryker/internal-utils';
import { ToastPackage, ToastRef, ToastrService } from 'ngx-toastr';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NotificationWrapperComponent } from './notification-wrapper.component';

const mockedType = 'mockedType';
const mockedConfig = { closeButton: true };
const mockedTitle = 'mockedTitle';
const mockedMessage = 'mockedMessage';
const mockedToastId = 'mockedToastId';

const MockToastPackage = {
    toastId: mockedToastId,
    toastType: mockedType,
    afterActivate: jest.fn(),
    config: mockedConfig,
    message: mockedMessage,
    title: mockedTitle,
    toastRef: new ToastRef(null as any),
};

class MockToastrService {
    remove = jest.fn();
}

describe('NotificationWrapperComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(NotificationWrapperComponent, {
        ngModule: {
            imports: [NoopAnimationsModule, OfTypePipeModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [testModule],
            providers: [
                { provide: ToastPackage, useValue: MockToastPackage },
                { provide: ToastrService, useExisting: MockToastrService },
                MockToastrService,
            ],
            teardown: { destroyAfterEach: false },
        });
    });

    it('should render <spy-notification-view>', async () => {
        const host = await createComponentWrapper(createComponent);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem).toBeTruthy();
    });

    it('should bind toastPackage.toastType to type of <spy-notification-view>', async () => {
        const host = await createComponentWrapper(createComponent);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem.properties.type).toBe(mockedType);
    });

    it('should bind toastPackage.closeButton to closeable of <spy-notification-view>', async () => {
        const host = await createComponentWrapper(createComponent);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem.properties.closeable).toBe(mockedConfig.closeButton);
    });

    it('closed output of <spy-notification-view> should call notificationRef.close', async () => {
        const host = await createComponentWrapper(createComponent);

        host.component.notificationRef = {
            close: jest.fn(),
        } as any;
        host.detectChanges();

        const notificationElem = host.queryCss('spy-notification-view');

        notificationElem.triggerEventHandler('closed', null);
        host.detectChanges();

        expect(host.component.notificationRef.close).toHaveBeenCalled();
    });
});
