import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule, provideIcons } from '@spryker/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { iconArrow } from './icons';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, IconModule, NzLayoutModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [provideIcons([{ name: 'arrow', svg: iconArrow }])],
})
export class SidebarModule {}
