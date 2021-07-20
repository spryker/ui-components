import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrchestratorCoreModule } from '@orchestrator/core';
import {
  LayoutFlatHostComponent,
  LayoutFlatHostModule,
} from '@orchestrator/layout';
import { IconModule } from '@spryker/icon';
import { I18nModule } from '@spryker/locale';
import { PopoverModule } from '@spryker/popover';
import { ContextModule, InvokeModule, PluckModule } from '@spryker/utils';
import { SelectComponentsModule } from '@spryker/web-components';
import { ActionsModule } from '@spryker/actions';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

import { provideTableColumnComponents } from './column-type/tokens';
import { IconNoDataModule, IconNoFilteredDataModule } from './icons';
import { TableColumnListComponent } from './table-column-list/table-column-list.component';
import { TableColumnRendererComponent } from './table-column-renderer/table-column-renderer.component';
import {
  provideTableFeatures,
  TableFeaturesRegistry,
} from './table-feature-loader';
import { TableFeatureModule } from './table-feature/table-feature.module';
import { TableFeaturesRendererComponent } from './table-features-renderer/table-features-renderer.component';
import { TableFeaturesRendererDirective } from './table-features-renderer/table-features-renderer.directive';
import { TableRenderFeatureDirective } from './table-features-renderer/table-render-feature.directive';
import { ColTplDirective } from './table/col-tpl.directive';
import { TableColumnComponentDeclaration } from './table/table';
import { CoreTableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    NzTableModule,
    OrchestratorCoreModule,
    LayoutFlatHostModule,
    ContextModule,
    TableFeatureModule,
    SelectComponentsModule,
    PluckModule,
    IconModule,
    IconNoDataModule,
    IconNoFilteredDataModule,
    NzSpinModule,
    I18nModule,
    PopoverModule,
    InvokeModule,
    ActionsModule,
  ],
  declarations: [
    CoreTableComponent,
    TableColumnRendererComponent,
    ColTplDirective,
    TableFeaturesRendererComponent,
    TableFeaturesRendererDirective,
    TableRenderFeatureDirective,
    TableColumnListComponent,
  ],
  exports: [
    CoreTableComponent,
    ColTplDirective,
    TableFeatureModule,
    TableColumnRendererComponent,
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
        provideTableColumnComponents(components),
      ],
    };
  }

  static withFeatures(
    features: TableFeaturesRegistry,
  ): ModuleWithProviders<TableModule> {
    return {
      ngModule: TableModule,
      providers: [provideTableFeatures(features)],
    };
  }
}
