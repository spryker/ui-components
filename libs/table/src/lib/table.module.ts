import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import {
  LayoutFlatHostComponent,
  LayoutFlatHostModule,
} from '@orchestrator/layout';
import { CheckboxModule } from '@spryker/checkbox';
import { PaginationModule } from '@spryker/pagination';
import { DropdownModule } from '@spryker/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SelectComponentsModule } from '@spryker/web-components';
import { IconActionModule } from '@spryker/icon/icons';
import { IconModule } from '@spryker/icon';

import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';
import { TableFeaturesRendererComponent } from './table-features-renderer/table-features-renderer.component';
import { ColTplDirective } from './table/col-tpl.directive';
import { TableColumnComponentDeclaration } from './table/table';
import { TableComponent } from './table/table.component';
import { TableFeatureDirective } from './table/table-feature.directive';
import { TableColumnListComponent } from './table-column-list/table-column-list.component';
import { ContextModule } from '@spryker/utils';
import { PluckModule } from '@spryker/utils';

export const TABLE_COLUMN_COMPONENT_TOKEN = new InjectionToken<
  TableColumnComponentDeclaration[]
>('TABLE_COLUMN_COMPONENT_TOKEN');

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    CheckboxModule,
    OrchestratorCoreModule,
    LayoutFlatHostModule,
    SelectComponentsModule,
    PaginationModule,
    DropdownModule,
    IconActionModule,
    IconModule,
    ContextModule,
    PluckModule,
  ],
  declarations: [
    TableComponent,
    TableColumnRendererComponent,
    ColTplDirective,
    TableFeaturesRendererComponent,
    TableFeatureDirective,
    TableColumnListComponent,
  ],
  exports: [
    TableComponent,
    TableColumnRendererComponent,
    ColTplDirective,
    TableFeatureDirective,
  ],
})
export class TableModule {
  static forRoot(): ModuleWithProviders<TableModule> {
    return {
      ngModule: TableModule,
      providers: [
        ...(LayoutFlatHostModule.forRoot().providers || []),
        ...(OrchestratorCoreModule.forRoot().providers || []),
        ...OrchestratorCoreModule.registerComponents({
          'layout-flat': LayoutFlatHostComponent,
          list: TableColumnListComponent,
        }),
      ],
    };
  }

  static withColumnComponents(
    components: TableColumnComponentDeclaration,
  ): ModuleWithProviders<TableModule> {
    return {
      ngModule: TableModule,
      providers: [
        OrchestratorCoreModule.registerComponents(
          components as Required<TableColumnComponentDeclaration>,
        ),
        {
          provide: TABLE_COLUMN_COMPONENT_TOKEN,
          useValue: components,
          multi: true,
        },
      ],
    };
  }
}
