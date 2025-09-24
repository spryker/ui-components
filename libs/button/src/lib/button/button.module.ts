import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonComponent } from './button.component';
import { SpinnerModule } from '@spryker/spinner';

@NgModule({
    imports: [CommonModule, ApplyAttrsModule, SpinnerModule],
    exports: [ButtonComponent],
    declarations: [ButtonComponent],
})
export class ButtonModule {}
