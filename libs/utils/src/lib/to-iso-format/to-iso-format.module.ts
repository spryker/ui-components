import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToIsoFormat } from './to-iso-format.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ToIsoFormat],
  exports: [ToIsoFormat],
})
export class ToIsoFormatModule {}
