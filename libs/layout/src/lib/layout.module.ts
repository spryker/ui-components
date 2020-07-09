import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [CommonModule, NzLayoutModule, CustomElementBoundaryModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
