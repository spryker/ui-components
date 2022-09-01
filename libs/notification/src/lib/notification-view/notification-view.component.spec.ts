import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getTestingForComponent } from '@orchestrator/ngx-testing';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { NotificationViewComponent } from './notification-view.component';

describe('NotificationViewComponent', () => {
    const { testModule, createComponent } = getTestingForComponent(NotificationViewComponent, {
        ngModule: {
            imports: [NzAlertModule, NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA],
        },
        projectContent: `
        <span title>
          <span class="test-title">Title...</span>
        </span>
        <span description>
          <span class="test-description">Description...</span>
        </span>
      `,
    });

    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [testModule],
            teardown: { destroyAfterEach: false },
        }),
    );

    it('should render nz-alert', async () => {
        const host = await createComponent({}, true);
        const alert = host.queryCss('nz-alert');

        expect(alert).toBeTruthy();
    });

    it('should render title with icon in nzMessage', async () => {
        const host = await createComponent({}, true);
        const alertMessage = host.queryCss('.ant-alert-message');
        const messageIcon = host.queryCss('.ant-alert-message spy-icon');
        const messageTitle = host.queryCss('.ant-alert-message .test-title');

        expect(alertMessage).toBeTruthy();
        expect(messageIcon).toBeTruthy();
        expect(messageTitle).toBeTruthy();
    });

    it('should render description in nzDescription', async () => {
        const host = await createComponent({}, true);
        const alertDescription = host.queryCss('.ant-alert-description');
        const descriptionContent = host.queryCss('.ant-alert-description .test-description');

        expect(alertDescription).toBeTruthy();
        expect(descriptionContent).toBeTruthy();
    });

    it('should render close icon in nzCloseText', async () => {
        const host = await createComponent(
            {
                closeable: true,
            },
            true,
        );
        const closeLink = host.queryCss('.ant-alert-close-icon');
        const closeIcon = host.queryCss('.ant-alert-close-icon spy-icon');

        expect(closeLink).toBeTruthy();
        expect(closeIcon).toBeTruthy();
    });

    describe('Inputs must be bound to internal nz-alert', () => {
        it('should bound type to nzType', async () => {
            const type: any = 'success';
            const host = await createComponent(
                {
                    type,
                },
                true,
            );
            const nzAlert = host.queryCss('nz-alert');

            expect(nzAlert?.componentInstance.nzType).toBe(type);
        });

        it('should bound closeable to nzCloseable', async () => {
            const host = await createComponent(
                {
                    closeable: true,
                },
                true,
            );
            const nzAlert = host.queryCss('nz-alert');

            expect(nzAlert?.componentInstance.nzCloseable).toBe(true);
        });
    });

    describe('Closeable functionality', () => {
        it('should emit closed on alert close', async () => {
            const host = await createComponent(
                {
                    closeable: true,
                },
                true,
            );
            const closeBtn = host.queryCss('.ant-alert-close-icon spy-icon');

            expect(closeBtn).toBeTruthy();

            closeBtn?.triggerEventHandler('click', null);
            host.detectChanges();

            expect(host.hostComponent.closed).toHaveBeenCalled();
        });

        it('should emit closed when method `closed` was executed', async () => {
            const host = await createComponent(
                {
                    closeable: true,
                },
                true,
            );

            host.component.close();

            expect(host.hostComponent.closed).toHaveBeenCalled();
        });
    });
});
