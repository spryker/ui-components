import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToIsoFormatPipe } from './to-iso-format.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ToIsoFormatPipe],
  exports: [ToIsoFormatPipe],
})
export class ToIsoFormatModule {}
