import { Injectable } from '@angular/core';
import { NotificationData } from './types';
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
      timeOut: 5000,
      closeButton: true,
    };
    const type = data.type || 'info';

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
