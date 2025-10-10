import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NotificationViewComponent } from './notification-view.component';

describe('NotificationViewComponent', () => {
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationViewComponent],
            imports: [NzAlertModule, NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
            teardown: { destroyAfterEach: true },
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationViewComponent);
        fixture.detectChanges();
    });

    it('should render <nz-alert>', () => {
        const alert = fixture.debugElement.query(By.css('nz-alert'));
        expect(alert).toBeTruthy();
    });

    it('should render title with icon in `nzMessage`', () => {
        const msg = fixture.debugElement.query(By.css('.ant-alert-message'));
        expect(msg).toBeTruthy();
    });

    it('should render description in `nzDescription`', () => {
        const desc = fixture.debugElement.query(By.css('.ant-alert-description'));
        expect(desc).toBeTruthy();
    });

    describe('Closeable functionality', () => {
        it('should render close icon in `nzCloseText`', () => {
            fixture.componentInstance.closeable = true;
            fixture.detectChanges();

            const closeLink = fixture.debugElement.query(By.css('.ant-alert-close-icon'));
            const closeIcon = fixture.debugElement.query(By.css('.ant-alert-close-icon spy-icon'));
            expect(closeLink).toBeTruthy();
            expect(closeIcon).toBeTruthy();
        });

        it('should emit closed on alert close', () => {
            fixture.componentInstance.closeable = true;
            fixture.detectChanges();

            const emitSpy = jest.spyOn(fixture.componentInstance.closed, 'emit');
            const closeBtnIcon = fixture.debugElement.query(By.css('.ant-alert-close-icon spy-icon'));
            expect(closeBtnIcon).toBeTruthy();

            closeBtnIcon.triggerEventHandler('click', { stopPropagation: jest.fn() });
            fixture.detectChanges();

            expect(emitSpy).toHaveBeenCalled();
        });

        it('should emit closed when method `closed` was executed', () => {
            const emitSpy = jest.spyOn(fixture.componentInstance.closed, 'emit');
            fixture.componentInstance.close();
            expect(emitSpy).toHaveBeenCalled();
        });
    });
});
