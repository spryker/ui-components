import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomElementBoundaryModule } from '@spryker/web-components';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule, NzLayoutModule, CustomElementBoundaryModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
