import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [CommonModule, NzAlertModule, IconModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
})
export class NotificationModule {}
