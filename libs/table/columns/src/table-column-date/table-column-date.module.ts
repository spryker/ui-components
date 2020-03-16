import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnDateComponent } from './table-column-date.component';
import { ContextModule } from '@spryker/utils';

@NgModule({
  declarations: [TableColumnDateComponent],
  imports: [CommonModule, ContextModule],
  exports: [TableColumnDateComponent],
})
export class TableColumnDateModule {}
