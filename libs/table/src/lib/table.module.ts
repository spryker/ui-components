import { InjectionToken, NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '@spryker/checkbox';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumnComponentDeclaration } from './table/table';
import { LayoutFlatHostModule, LayoutFlatHostComponent } from '@orchestrator/layout';
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
    CheckboxModule,
    OrchestratorCoreModule,
    LayoutFlatHostModule,
  ],
  declarations: [TableComponent, TableColumnRendererComponent, ColTplDirective],
  exports: [TableComponent, TableColumnRendererComponent, ColTplDirective],
})
export class TableModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TableModule,
      providers: [
        <Provider[]>LayoutFlatHostModule.forRoot().providers,
        <Provider[]>OrchestratorCoreModule.forRoot().providers,
        OrchestratorCoreModule.registerComponents({'layout-flat': LayoutFlatHostComponent}),
      ],
    }
  }

  static withColumnComponents(components: TableColumnComponentDeclaration): ModuleWithProviders {
    return {
      ngModule: TableModule,
      providers: [
        OrchestratorCoreModule.registerComponents(components),
        {
          provide: TABLE_COLUMN_COMPONENT_TOKEN,
          useValue: components,
          multi: true,
        },
      ],
    }
  }
}
