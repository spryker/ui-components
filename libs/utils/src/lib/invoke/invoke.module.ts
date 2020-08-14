import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InvokePipe } from './invoke.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [InvokePipe],
  declarations: [InvokePipe],
})
export class InvokeModule {}
