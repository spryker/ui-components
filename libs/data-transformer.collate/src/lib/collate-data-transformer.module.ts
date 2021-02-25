import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  provideDataTransformerConfiguratorTypes,
  provideDataTransformerFilters,
} from './tokens';
import {
  DataTransformerConfiguratorDeclaration,
  DataTransformerFilterDeclaration,
} from './types';

@NgModule({
  imports: [CommonModule],
})
export class CollateDataTransformerModule {
  static withConfigurators(
    dataConfigurators: DataTransformerConfiguratorDeclaration,
  ): ModuleWithProviders<CollateDataTransformerModule> {
    return {
      ngModule: CollateDataTransformerModule,
      providers: [provideDataTransformerConfiguratorTypes(dataConfigurators)],
    };
  }

  static withFilters(
    filters: DataTransformerFilterDeclaration,
  ): ModuleWithProviders<CollateDataTransformerModule> {
    return {
      ngModule: CollateDataTransformerModule,
      providers: [provideDataTransformerFilters(filters)],
    };
  }
}
