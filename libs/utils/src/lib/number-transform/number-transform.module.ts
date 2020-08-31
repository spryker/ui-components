import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberTransformPipe } from './number-transform.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [NumberTransformPipe],
  exports: [NumberTransformPipe],
})
export class NumberTransformModule {}
