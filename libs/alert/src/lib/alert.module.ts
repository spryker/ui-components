import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponent } from './alert/alert.component';
import { IconModule } from '@spryker/icon';

@NgModule({
  imports: [CommonModule, IconModule, BrowserAnimationsModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
