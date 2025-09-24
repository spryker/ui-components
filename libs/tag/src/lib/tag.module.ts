import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconRemoveModule } from '@spryker/icon/icons';
import { ButtonIconModule } from '@spryker/button.icon';

import { TagComponent } from './tag/tag.component';

@NgModule({
    imports: [CommonModule, ButtonIconModule, IconRemoveModule],
    declarations: [TagComponent],
    exports: [TagComponent],
})
export class TagModule {}
