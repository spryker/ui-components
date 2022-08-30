import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { ToastPackage, ToastRef, ToastrService } from 'ngx-toastr';
import { NotificationWrapperComponent } from './notification-wrapper.component';
import { getTestingForComponent } from '@orchestrator/ngx-testing';

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
        const host = await createComponent({}, true);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem).toBeTruthy();
    });

    it('should bind toastPackage.toastType to type of <spy-notification-view>', async () => {
        const host = await createComponent({}, true);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem.properties.type).toBe(mockedType);
    });

    it('should bind toastPackage.closeButton to closeable of <spy-notification-view>', async () => {
        const host = await createComponent({}, true);
        const notificationElem = host.queryCss('spy-notification-view');

        expect(notificationElem.properties.closeable).toBe(mockedConfig.closeButton);
    });

    xit('closed output of <spy-notification-view> should call notificationRef.close', async () => {
        const host = await createComponent({ notificationRef: { close: jest.fn() } as any }, true);
        const notificationElem = host.queryCss('spy-notification-view');

        notificationElem.triggerEventHandler('closed', null);
        host.detectChanges();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(host.hostComponent.notificationRef!.close).toHaveBeenCalled();
    });
});
