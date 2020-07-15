import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplyAttrsModule } from '@spryker/utils';

import { ButtonComponent } from './button.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [CommonModule, ApplyAttrsModule, NzSpinModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule {}
