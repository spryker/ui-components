import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponent } from './alert/alert.component';
import { IconModule, provideIcons, Icon } from '@spryker/icon';
import errorIcon from './icons/error';

const icons: Icon[] = [
  {
    name: 'error',
    svg: errorIcon,
  },
];

@NgModule({
  imports: [CommonModule, IconModule, BrowserAnimationsModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [provideIcons(icons)],
})
export class AlertModule {}
