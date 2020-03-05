import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '@spryker/checkbox';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { TableColumnComponentDeclaration } from './table/table';
import { LayoutModule } from '@orchestrator/layout';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    HttpClientModule,
    CheckboxModule,
    OrchestratorCoreModule,
  ],
  declarations: [TableComponent, TableColumnRendererComponent],
  exports: [TableComponent, TableColumnRendererComponent],
})
export class TableModule {
  static withColumnComponents(
    components: TableColumnComponentDeclaration,
  ): void {}

  static forRoot() {}
}
