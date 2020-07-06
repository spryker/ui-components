import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule {}
