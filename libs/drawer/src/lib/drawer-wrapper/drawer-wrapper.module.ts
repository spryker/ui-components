import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import {
  IconMaximizeModule,
  IconMinimizeModule,
  IconRemoveModule,
} from '@spryker/icon/icons';

import { DrawerWrapperComponent } from './drawer-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    IconMaximizeModule,
    IconRemoveModule,
    IconMinimizeModule,
  ],
  exports: [DrawerWrapperComponent],
  declarations: [DrawerWrapperComponent],
})
export class DrawerWrapperModule {}
