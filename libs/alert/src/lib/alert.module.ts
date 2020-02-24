import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponent } from './alert/alert.component';
import { errorIcon } from './alert/alert.component.icons';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';

const icons = [
  {
    name: 'error',
    svg: function() {
      return new Promise(resolve => {
        resolve(errorIcon);
      });
    },
  }
];

@NgModule({
  imports: [CommonModule, IconModule, BrowserAnimationsModule, NzAlertModule],
  declarations: [AlertComponent],
  exports: [AlertComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: icons,
    },
  ],
})
export class AlertModule {}
