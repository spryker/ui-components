import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RomanPipe } from './roman.pipe';



@NgModule({
  declarations: [RomanPipe],
  imports: [
    CommonModule
  ],
  exports: [RomanPipe]
})
export class RomanModule { }
