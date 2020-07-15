import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonLinkComponent } from './button-link.component';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule],
  exports: [ButtonLinkComponent],
  declarations: [ButtonLinkComponent],
})
export class ButtonLinkModule {}
