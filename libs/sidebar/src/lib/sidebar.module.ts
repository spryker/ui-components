import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { IconModule, ICONS_TOKEN } from '@spryker/icon';
import arrowIcon from './sidebar/arrow';

@NgModule({
  imports: [CommonModule, IconModule, NzLayoutModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  providers: [
    {
      provide: ICONS_TOKEN,
      useValue: {
        name: 'arrow',
        svg: arrowIcon,
      },
      multi: true,
    },
  ],
})
export class SidebarModule {}
