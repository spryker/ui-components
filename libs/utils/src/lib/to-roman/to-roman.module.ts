import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToRomanPipePipe } from './transform-to-roman.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ToRomanPipePipe],
  exports: [ToRomanPipePipe],
})
export class ToRomanModule {}
