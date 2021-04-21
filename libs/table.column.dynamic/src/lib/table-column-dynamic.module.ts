import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModule } from '@spryker/utils';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';

@NgModule({
  imports: [CommonModule, ContextModule],
  declarations: [TableColumnDynamicComponent],
  exports: [TableColumnDynamicComponent],
})
export class TableColumnDynamicModule {}
