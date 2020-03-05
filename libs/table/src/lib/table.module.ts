import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '@spryker/checkbox';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { TableColumnComponentDeclaration } from './table/table';
import { LayoutModule, LayoutFlatHostComponent } from '@orchestrator/layout';
import { OrchestratorCoreModule } from '@orchestrator/core';
import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';
import { ColTplDirective } from './table/col.tpl.directive';

const TABLE_COLUMN_COMPONENT_TOKEN = new InjectionToken<
  TableColumnComponentDeclaration[]
>('TABLE_COLUMN_COMPONENT_TOKEN');

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    HttpClientModule,
    CheckboxModule,
    OrchestratorCoreModule,
    LayoutModule,
  ],
  declarations: [TableComponent, TableColumnRendererComponent, ColTplDirective],
  exports: [TableComponent, TableColumnRendererComponent, ColTplDirective],
})
export class TableModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: TableModule,
  //     providers: [
  //       LayoutModule.forRoot().providers,
  //       // OrchestratorCoreModule.forRoot().providers,
  //       // OrchestratorCoreModule.registerComponents({'layout-flat': LayoutFlatHostComponent})
  //     ]
  //   }
  // }
  // static forRoot(components: any) {
  //   return {
  //     providers: [
  //       {
  //         provide: NEW_TOKEN,
  //         useValue: components
  //       }
  //     ]
  //   }
  // }
}
