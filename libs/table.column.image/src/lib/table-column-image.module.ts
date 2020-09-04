import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnImageComponent } from './table-column-image.component';
import { ContextModule } from '@spryker/utils';

@NgModule({
  imports: [CommonModule, ContextModule],
  exports: [TableColumnImageComponent],
  declarations: [TableColumnImageComponent],
})
export class TableColumnImageModule {}
