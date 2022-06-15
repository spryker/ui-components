import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';

import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [TagComponent],
  exports: [TagComponent],
})
export class TagModule {}
