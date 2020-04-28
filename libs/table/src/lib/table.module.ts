import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import {
  LayoutFlatHostComponent,
  LayoutFlatHostModule,
} from '@orchestrator/layout';
import { CheckboxModule } from '@spryker/checkbox';
import { DropdownModule } from '@spryker/dropdown';
import { IconModule } from '@spryker/icon';
import { IconActionModule } from '@spryker/icon/icons';
import { PaginationModule } from '@spryker/pagination';
import { ContextModule } from '@spryker/utils';
import { SelectComponentsModule } from '@spryker/web-components';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TableColumnListComponent } from './table-column-list/table-column-list.component';
import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';
import { TableFeaturesRendererComponent } from './table-features-renderer/table-features-renderer.component';
import { TableFeaturesRendererDirective } from './table-features-renderer/table-features-renderer.directive';
import { TableRenderFeatureDirective } from './table-features-renderer/table-render-feature.directive';
import { ColTplDirective } from './table/col-tpl.directive';
import { TableColumnComponentDeclaration } from './table/table';
import { TableFeatureTplDirective } from './table-feature/table-feature-tpl.directive';
import { TableFeatureDirective } from './table-feature/table-feature.directive';
import { CoreTableComponent } from './table/table.component';

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
  ],
  declarations: [
    CoreTableComponent,
    TableColumnRendererComponent,
    ColTplDirective,
    TableFeaturesRendererComponent,
    TableFeaturesRendererDirective,
    TableRenderFeatureDirective,
    TableFeatureDirective,
    TableColumnListComponent,
    TableFeatureTplDirective,
  ],
  exports: [
    CoreTableComponent,
    ColTplDirective,
    TableFeatureDirective,
    TableFeatureTplDirective,
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
