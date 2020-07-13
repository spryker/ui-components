import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './join.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [JoinPipe],
  exports: [JoinPipe],
})
export class JoinModule {}
