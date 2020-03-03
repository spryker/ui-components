import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { TableColumnComponentDeclaration } from './table/table';

@NgModule({
  imports: [CommonModule, NzTableModule, HttpClientModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {
  static withColumnComponents(
    components: TableColumnComponentDeclaration,
  ): void {}
}
