import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponent } from './alert/alert.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}
