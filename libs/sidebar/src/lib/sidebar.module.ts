import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spryker/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, IconModule, NzLayoutModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
