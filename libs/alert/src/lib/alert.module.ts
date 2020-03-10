import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Icon, IconModule, provideIcons } from '@spryker/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AlertComponent } from './alert/alert.component';
import { iconError } from './icons';

const icons: Icon[] = [
  {
    name: 'error',
    svg: iconError,
  },
];

@NgModule({
  imports: [CommonModule, IconModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [provideIcons(icons)],
})
export class AlertModule {}
