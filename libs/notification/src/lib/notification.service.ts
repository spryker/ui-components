import { Injectable, inject } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';

import { NotificationRef } from './notification-ref';
import { NotificationWrapperComponent } from './notification-wrapper/notification-wrapper.component';
import { NotificationData, NotificationEasing, NotificationPosition, NotificationType } from './types';
import { mapDataToConfig } from './util';

/**
 * `ToastrService.show()` is declared to return `null` when it declines to open a toast. Neither
 * `NotificationRef` nor the public `show(): NotificationRef` signature can carry a null, so this
 * stands in for the toast that was never created: closing it does nothing, and it never reports
 * having closed.
 */
const declinedToast = {
    toastRef: { close: () => undefined },
    onHidden: EMPTY,
} as unknown as ActiveToast<NotificationWrapperComponent>;

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    protected toastrService = inject(ToastrService);

    show(data: NotificationData): NotificationRef {
        let individualConfig: Partial<IndividualConfig> = {
            toastComponent: NotificationWrapperComponent,
            easeTime: this.toastrService.toastrConfig.easeTime ?? 300,
            easing: this.toastrService.toastrConfig.easing ?? NotificationEasing.EaseIn,
            positionClass: this.toastrService.toastrConfig.positionClass ?? NotificationPosition.TopRight,
            disableTimeOut: this.toastrService.toastrConfig.disableTimeOut,
            tapToDismiss: this.toastrService.toastrConfig.tapToDismiss ?? false,
            timeOut: this.toastrService.toastrConfig.timeOut ?? 3000,
            closeButton: this.toastrService.toastrConfig.closeButton ?? true,
        };
        const type = data.type || NotificationType.Info;

        individualConfig = mapDataToConfig(data, individualConfig);

        const activeToast = this.toastrService.show<NotificationWrapperComponent>(
            data.description as any,
            data.title as any,
            individualConfig,
            type,
        );

        if (!activeToast) {
            return new NotificationRef(declinedToast);
        }

        const notificationRef = new NotificationRef(activeToast);

        activeToast.portal.instance.notificationRef = notificationRef;
        return notificationRef;
    }

    removeAll(): void {
        this.toastrService.clear();
    }
}
