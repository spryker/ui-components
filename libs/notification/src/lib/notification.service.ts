import { Injectable } from '@angular/core';
import { NotificationData } from './types';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { NotificationRef } from './notification-ref';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  show(data: NotificationData): NotificationRef {
    const individualConfig: Partial<IndividualConfig> = {
      easeTime: 300,
      easing: 'ease-in',
      positionClass: 'topRight',
      timeOut: 5000,
    };
    const type = data.type ? data.type : 'info';

    if (data?.closeable) {
      individualConfig.closeButton = data.closeable;
    }
    if (data?.timeOut) {
      individualConfig.timeOut = data?.timeOut;
    }
    if (data?.easing) {
      individualConfig.easing = data?.easing;
    }
    if (data?.easeTime) {
      individualConfig.easeTime = data?.easeTime;
    }
    if (data?.position) {
      individualConfig.positionClass = data?.position;
    }

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
