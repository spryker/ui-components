import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonAjaxComponent } from './button-ajax.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule, ButtonModule],
  exports: [ButtonAjaxComponent],
  declarations: [ButtonAjaxComponent],
})
export class ButtonAjaxModule {}
