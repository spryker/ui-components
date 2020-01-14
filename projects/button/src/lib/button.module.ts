import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button.component';
import { RenderTplComponent } from './render-tpl.component';
import { SlotDirective } from './slot.directive';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonComponent],
  declarations: [ButtonComponent, SlotDirective, RenderTplComponent],
})
export class ButtonModule {}
