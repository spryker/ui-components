import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@spryker/button';
import { OfTypePipeModule } from '@spryker/utils';
import { I18nModule } from '@spryker/locale';

import { ConfirmModalComponent } from './confirm.component';

@NgModule({
    imports: [CommonModule, ButtonModule, OfTypePipeModule, I18nModule],
    declarations: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
