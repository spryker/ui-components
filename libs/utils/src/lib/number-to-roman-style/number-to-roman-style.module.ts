import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToRomanStylePipe } from './number-to-roman-style.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [NumberToRomanStylePipe],
  exports: [NumberToRomanStylePipe],
})
export class NumberToRomanStyleModule {}
