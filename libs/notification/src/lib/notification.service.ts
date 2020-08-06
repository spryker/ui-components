import { Injectable } from '@angular/core';
import { NotificationData, NotificationDataType } from './types';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NotificationRef } from './notification-ref';
import { mapDataToConfig } from './util';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  show(data: NotificationData): NotificationRef {
    let individualConfig: Partial<IndividualConfig> = {
      easeTime: 300,
      easing: 'ease-in',
      positionClass: 'topRight',
      disableTimeOut: data.type !== NotificationDataType.Success,
      tapToDismiss: false,
      timeOut: 3000,
      closeButton: true,
    };
    const type = data.type || NotificationDataType.Info;

    individualConfig.closeButton =
      data.closeable ?? individualConfig.closeButton;
    individualConfig = mapDataToConfig(data, individualConfig);

    const notificationRef = new NotificationRef(
      this.toastrService.show(
        data.description,
        data.title,
        individualConfig,
        type,
      ),
      this.toastrService,
    );

    return notificationRef;
  }

  removeAll(): void {
    this.toastrService.clear();
  }
}
