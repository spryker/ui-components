import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OfTypePipeModule } from '@spryker/utils';
import { ToastPackage, ToastRef, ToastrService } from 'ngx-toastr';
import { NotificationWrapperComponent } from './notification-wrapper.component';

const mockedType = 'mockedType';
const mockedConfig = { closeButton: true };

class MockToastrService {
    remove = jest.fn();
}

describe('NotificationWrapperComponent', () => {
    let fixture: any;

    const MockToastPackage = {
        toastId: 'mockedToastId' as any,
        toastType: 'mockedType' as any,
        config: { closeButton: true } as any,
        message: 'mockedMessage' as any,
        title: 'mockedTitle' as any,
        toastRef: new ToastRef(null as any),
    };

    const q = (css: string) => fixture.debugElement.query(By.css(css));

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationWrapperComponent],
            imports: [NoopAnimationsModule, OfTypePipeModule],
            providers: [
                { provide: ToastPackage, useValue: MockToastPackage },
                { provide: ToastrService, useExisting: MockToastrService },
                MockToastrService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationWrapperComponent);
        fixture.detectChanges();
    });

    it('should render <spy-notification-view>', () => {
        const notificationElem = q('spy-notification-view');
        expect(notificationElem).toBeTruthy();
    });

    it('should bind toastPackage.toastType to type of <spy-notification-view>', () => {
        const notificationElem = q('spy-notification-view');
        expect(notificationElem.properties.type).toBe(mockedType);
    });

    it('should bind toastPackage.closeButton to closeable of <spy-notification-view>', () => {
        const notificationElem = q('spy-notification-view');
        expect(notificationElem.properties.closeable).toBe(mockedConfig.closeButton);
    });

    it('closed output of <spy-notification-view> should call notificationRef.close', () => {
        (fixture.componentInstance as NotificationWrapperComponent).notificationRef = {
            close: jest.fn(),
        } as any;
        fixture.detectChanges();

        const notificationElem = q('spy-notification-view');
        notificationElem.triggerEventHandler('closed', null);
        fixture.detectChanges();

        expect((fixture.componentInstance as NotificationWrapperComponent).notificationRef.close).toHaveBeenCalled();
    });
});
