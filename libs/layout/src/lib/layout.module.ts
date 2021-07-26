import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyContextsModule } from '@spryker/utils';
import { CustomElementBoundaryModule } from '@spryker/web-components';
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
