import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [CommonModule, NzMenuModule, IconModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
})
export class NavigationModule {}
