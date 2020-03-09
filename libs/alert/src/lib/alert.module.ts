import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, IconModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
