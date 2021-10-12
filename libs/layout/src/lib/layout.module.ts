import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { ApplyContextsModule } from '@spryker/utils';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    CustomElementBoundaryModule,
    ApplyContextsModule,
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
