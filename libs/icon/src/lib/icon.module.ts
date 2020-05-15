import { CommonModule } from '@angular/common';
import { NgModule, Optional, Self, SkipSelf, Inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IconComponent } from './icon/icon.component';
import { InternalIconService } from './icon/internal-icon.service';
import { InjectionTokenType } from '@spryker/utils';
import { ICONS_TOKEN } from './icon/tokens';

@NgModule({
  imports: [CommonModule, NzIconModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {
  constructor(
    private iconsService: InternalIconService,
    @SkipSelf() @Optional() private parentIconService: InternalIconService,
    @Self()
    @Optional()
    @Inject(ICONS_TOKEN)
    icons: InjectionTokenType<typeof ICONS_TOKEN>,
  ) {
    this.iconsService.init();

    if (parentIconService && icons) {
      icons
        .flat()
        .forEach(icon => this.iconsService.addIcon(icon.icon, icon.svg));
    }
  }
}
