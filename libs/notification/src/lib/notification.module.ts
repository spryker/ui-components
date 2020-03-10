import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Icon, IconModule, provideIcons } from '@spryker/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import {
  iconError,
  iconInfo,
  iconRemove,
  iconSuccess,
  iconWarning,
} from './icons';
import { NotificationComponent } from './notification/notification.component';

const icons: Icon[] = [
  { name: 'error', svg: iconError },
  { name: 'success', svg: iconSuccess },
  { name: 'warning', svg: iconWarning },
  { name: 'info', svg: iconInfo },
  { name: 'remove', svg: iconRemove },
];

@NgModule({
  imports: [CommonModule, NzAlertModule, IconModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  providers: [provideIcons(icons)],
})
export class NotificationModule {}
