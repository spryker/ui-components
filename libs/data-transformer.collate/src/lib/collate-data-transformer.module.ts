import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  provideCollateDataConfiguratorTypes,
  provideCollateFilters,
} from './tokens';
import {
  CollateDataConfiguratorsDeclaration,
  CollateFiltersDeclaration,
} from './types';

@NgModule({
  imports: [CommonModule],
})
export class CollateDataTransformerModule {
  static withFilters(
    filters: CollateFiltersDeclaration,
  ): ModuleWithProviders<CollateDataTransformerModule> {
    return {
      ngModule: CollateDataTransformerModule,
      providers: [provideCollateFilters(filters)],
    };
  }

  static withConfigurators(
    dataConfigurators: CollateDataConfiguratorsDeclaration,
  ): ModuleWithProviders<CollateDataTransformerModule> {
    return {
      ngModule: CollateDataTransformerModule,
      providers: [provideCollateDataConfiguratorTypes(dataConfigurators)],
    };
  }
}
