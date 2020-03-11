import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponentsModule } from '@spryker/web-components';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { IconModule } from '@spryker/icon';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { IconErrorModule } from './icons';

@NgModule({
  imports: [
    CommonModule,
    NzTabsModule,
    IconModule,
    SelectComponentsModule,
    IconErrorModule,
  ],
  declarations: [TabsComponent, TabComponent],
  exports: [TabsComponent, TabComponent],
})
export class TabsModule {}
