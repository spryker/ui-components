import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, inject } from '@angular/core';
import { Toast } from 'ngx-toastr';

import { NotificationRef } from '../notification-ref';

@Component({
    standalone: false,
    selector: 'spy-notification-wrapper',
    templateUrl: './notification-wrapper.component.html',
    styleUrls: ['./notification-wrapper.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'spy-notification-wrapper',
    },
})
export class NotificationWrapperComponent extends Toast {
    protected cdr = inject(ChangeDetectorRef);

    notificationRef?: NotificationRef;

    closeHandler(): void {
        this.notificationRef?.close();
    }

    override activateToast() {
        super.activateToast();
        this.cdr.markForCheck();
    }
}
