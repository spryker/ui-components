import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { NotificationRef } from './notification-ref';
import { NotificationWrapperComponent } from './notification-wrapper/notification-wrapper.component';
import {
  NotificationData,
  NotificationEasing,
  NotificationPosition,
  NotificationType,
} from './types';
import { mapDataToConfig } from './util';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

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

    const activeToast = this.toastrService.show(
      data.description as any,
      data.title as any,
      individualConfig,
      type,
    );

    const notificationRef = new NotificationRef(activeToast);

    activeToast.portal.instance.notificationRef = notificationRef;
    return notificationRef;
  }

  removeAll(): void {
    this.toastrService.clear();
  }
}
