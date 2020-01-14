import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';
import { SlotModule } from './slot';

@NgModule({
  imports: [CommonModule, SlotModule.configure({ parentTag: 'spy-parent' })],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule {}
