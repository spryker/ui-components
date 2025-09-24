import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjaxActionModule } from '@spryker/ajax-action';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonModule } from '../button/button.module';
import { ButtonAjaxComponent } from './button-ajax.component';

@NgModule({
    imports: [CommonModule, ApplyAttrsModule, AjaxActionModule, ButtonModule],
    exports: [ButtonAjaxComponent],
    declarations: [ButtonAjaxComponent],
})
export class ButtonAjaxModule {}
