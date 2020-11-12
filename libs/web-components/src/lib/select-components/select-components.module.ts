import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectComponentsDirective } from './select-components.directive';

@NgModule({
  imports: [CommonModule],
  exports: [SelectComponentsDirective],
  declarations: [SelectComponentsDirective],
})
export class SelectComponentsModule {}
