import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonAjaxComponent } from './button-ajax.component';
import { ButtonComponent } from '../button/button.component';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule],
  exports: [ButtonAjaxComponent],
  declarations: [ButtonAjaxComponent, ButtonComponent],
})
export class ButtonAjaxModule {}
