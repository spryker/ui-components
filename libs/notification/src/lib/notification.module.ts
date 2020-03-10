import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import {
  IconErrorModule,
  IconInfoModule,
  IconRemoveModule,
  IconSuccessModule,
  IconWarningModule,
} from '@spryker/icon/icons';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [
    CommonModule,
    NzAlertModule,
    IconModule,
    IconErrorModule,
    IconSuccessModule,
    IconWarningModule,
    IconInfoModule,
    IconRemoveModule,
  ],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationModule {}
