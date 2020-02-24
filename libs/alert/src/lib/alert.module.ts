import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AlertComponent } from './alert/alert.component';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import { errorIcon } from './alert/alert.component.icons';

export function errorIconFactory() {
  return new Promise(function(resolve) {
    resolve(errorIcon);
  });
}

const icons = [
  {
    name: 'error',
    svg: errorIconFactory,
  },
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
