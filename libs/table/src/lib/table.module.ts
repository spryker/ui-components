import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, NzTableModule, HttpClientModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}
