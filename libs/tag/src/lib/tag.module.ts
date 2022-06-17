import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@spryker/icon';
import { IconRemoveModule } from '@spryker/icon/icons';

import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [CommonModule, IconModule, IconRemoveModule],
  declarations: [TagComponent],
  exports: [TagComponent],
})
export class TagModule {}
