import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
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
    private iconsService = inject(InternalIconService);
    private parentIconService = inject(InternalIconService, { skipSelf: true, optional: true })!;

    constructor() {
        const parentIconService = this.parentIconService;
        const icons = inject<InjectionTokenType<typeof ICONS_TOKEN>>(ICONS_TOKEN, { self: true, optional: true })!;

        this.iconsService.init();

        if (parentIconService && icons) {
            icons.flat().forEach((icon) => this.iconsService.addIcon(icon.icon, icon.svg));
        }
    }
}
