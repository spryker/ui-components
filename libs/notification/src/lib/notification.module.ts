import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NotificationComponent } from './notification/notification.component';
import {
  errorIcon,
  successIcon,
  warningIcon,
  infoIcon,
  removeIcon,
} from './notification/icons';

const icons = [
  {
    name: 'error',
    svg: errorIcon,
  },
  {
    name: 'success',
    svg: successIcon,
  },
  {
    name: 'warning',
    svg: warningIcon,
  },
  {
    name: 'info',
    svg: infoIcon,
  },
  {
    name: 'remove',
    svg: removeIcon,
  },
];

@NgModule({
  imports: [CommonModule, NzAlertModule, IconModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: icons,
    },
  ],
})
export class NotificationModule {}
