import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfTypePipe } from './of-type.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [OfTypePipe],
  exports: [OfTypePipe],
})
export class OfTypePipeModule {}
