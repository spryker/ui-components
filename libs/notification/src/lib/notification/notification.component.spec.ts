import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from '../notification.service';
import { NotificationComponent } from './notification.component';

class MockNotificationRef {
    afterClose$ = new (require('rxjs').Subject)();
    afterClose = jest.fn().mockReturnValue(this.afterClose$);
    close = jest.fn();
}

class MockNotificationService {
    notificationRef = new MockNotificationRef();
    show = jest.fn().mockReturnValue(this.notificationRef);
}

describe('NotificationWrapperComponent', () => {
    let fixture: any;
    let service: MockNotificationService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationComponent],
            providers: [
                { provide: NotificationService, useExisting: MockNotificationService },
                MockNotificationService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        service = TestBed.inject(MockNotificationService);
    });

    const create = (inputs: Partial<NotificationComponent> = {}) => {
        fixture = TestBed.createComponent(NotificationComponent);
        Object.assign(fixture.componentInstance, inputs);
        fixture.detectChanges();
        return fixture;
    };

    describe('Floating', () => {
        it('should emit `closed` if `notificationRef.afterClose` has been invoked', () => {
            create({ floating: true });
            const emitSpy = jest.spyOn(fixture.componentInstance.closed, 'emit');

            service.notificationRef.afterClose$.next();
            fixture.detectChanges();

            expect(emitSpy).toHaveBeenCalled();
        });

        it('should invoke `notificationRef.close` if method `close` has been executed', () => {
            create({ floating: true });
            fixture.componentInstance.close();
            expect(service.notificationRef.close).toHaveBeenCalled();
        });
    });
});
