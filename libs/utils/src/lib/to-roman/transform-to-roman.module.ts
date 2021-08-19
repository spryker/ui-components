import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformToRomanPipe } from './transform-to-roman.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TransformToRomanPipe],
  exports: [TransformToRomanPipe],
})
export class TransformToRomanModule {}
