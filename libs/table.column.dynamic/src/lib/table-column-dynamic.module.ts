import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextModule } from '@spryker/utils';
import { TableColumnDynamicComponent } from './table-column-dynamic.component';
import { TableModule } from '@spryker/table';

@NgModule({
  imports: [CommonModule, ContextModule, TableModule],
  declarations: [TableColumnDynamicComponent],
  exports: [TableColumnDynamicComponent],
})
export class TableColumnDynamicModule {}
