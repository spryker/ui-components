import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponentsModule } from '@spryker/web-components';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { provideIcons, IconModule } from '@spryker/icon';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { errorIcon } from './icons';

@NgModule({
  imports: [CommonModule, NzTabsModule, IconModule, SelectComponentsModule],
  declarations: [TabsComponent, TabComponent],
  exports: [TabsComponent, TabComponent],
  providers: [
    provideIcons([
      {
        name: 'error-icon',
        svg: errorIcon,
      },
    ]),
  ],
})
export class TabsModule {}
