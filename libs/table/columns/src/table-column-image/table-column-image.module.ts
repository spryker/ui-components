import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumnImageComponent } from './table-column-image.component';
import { ContextModule } from '@spryker/utils';

@NgModule({
  declarations: [TableColumnImageComponent],
  imports: [CommonModule, ContextModule],
  exports: [TableColumnImageComponent],
})
export class TableColumnImageModule {}
