import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { ApplyAttrsModule } from '@spryker/utils';

@NgModule({
  declarations: [ButtonToggleComponent],
  imports: [CommonModule, ApplyAttrsModule],
  exports: [ButtonToggleComponent],
})
export class ButtonToggleModule {}
