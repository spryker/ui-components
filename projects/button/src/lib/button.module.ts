import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonSlotComponent } from './button-slot.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonComponent, ButtonSlotComponent],
  declarations: [ButtonComponent, ButtonSlotComponent],
})
export class ButtonModule {}
