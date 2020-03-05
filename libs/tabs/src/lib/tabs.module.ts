import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponentsModule } from '@spryker/web-components';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [CommonModule, NzTabsModule, SelectComponentsModule],
  declarations: [TabsComponent, TabComponent],
  exports: [TabsComponent, TabComponent],
})
export class TabsModule {}
