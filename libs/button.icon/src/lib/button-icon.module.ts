import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { IconModule } from '@spryker/icon';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, IconModule, ApplyAttrsModule],
  declarations: [ButtonIconComponent],
  exports: [ButtonIconComponent],
})
export class ButtonIconModule {}
