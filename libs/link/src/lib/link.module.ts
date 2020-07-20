import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';

import { LinkComponent } from './link/link.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [LinkComponent],
  exports: [LinkComponent],
})
export class LinkModule {}
