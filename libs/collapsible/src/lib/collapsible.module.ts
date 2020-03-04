import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapsibleComponent } from './collapsible/collapsible.component';

@NgModule({
  imports: [CommonModule, NzCollapseModule, IconModule],
  declarations: [CollapsibleComponent],
  exports: [CollapsibleComponent],
})
export class CollapsibleModule {}
