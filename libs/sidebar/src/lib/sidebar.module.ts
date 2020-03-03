import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconModule, provideIcons } from '@spryker/icon';
import arrowIcon from './sidebar/arrow';

@NgModule({
  imports: [CommonModule, IconModule, NzLayoutModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [
    provideIcons([
      {
        name: 'arrow',
        svg: arrowIcon,
      },
    ]),
  ],
})
export class SidebarModule {}
