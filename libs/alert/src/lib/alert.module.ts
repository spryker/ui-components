import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { IconErrorModule } from '@spryker/icon/icons';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, NzAlertModule, IconModule, IconErrorModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
