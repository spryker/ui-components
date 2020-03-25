import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconComponent } from './icon/icon.component';
import { InternalIconService } from './icon/internal-icon.service';

@NgModule({
  imports: [CommonModule, NzIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {
  constructor(private iconsService: InternalIconService) {
    this.iconsService.init();
  }
}
