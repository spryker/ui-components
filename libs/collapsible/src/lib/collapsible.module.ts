import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CollapsibleComponent } from './collapsible/collapsible.component';

@NgModule({
  imports: [
    CommonModule,
    NzCollapseModule,
    IconModule,
    BrowserAnimationsModule,
  ],
  declarations: [CollapsibleComponent],
  exports: [CollapsibleComponent],
})
export class CollapsibleModule {}
