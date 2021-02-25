import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  provideDataTransformerType,
  provideDataTransformerConfiguratorTypes,
  provideDataTransformerFilters,
} from './tokens';
import {
  DataTransformerTypesDeclaration,
  DataTransformerConfiguratorDeclaration,
  DataTransformerFilterDeclaration,
} from './types';

@NgModule({
  imports: [CommonModule],
})
export class DataTransformerModule {
  static withTransformers(
    transformers: DataTransformerTypesDeclaration,
  ): ModuleWithProviders<DataTransformerModule> {
    return {
      ngModule: DataTransformerModule,
      providers: [provideDataTransformerType(transformers)],
    };
  }

  static withConfigurators(
    dataConfigurators: DataTransformerConfiguratorDeclaration,
  ): ModuleWithProviders<DataTransformerModule> {
    return {
      ngModule: DataTransformerModule,
      providers: [provideDataTransformerConfiguratorTypes(dataConfigurators)],
    };
  }

  static withFilters(
    filters: DataTransformerFilterDeclaration,
  ): ModuleWithProviders<DataTransformerModule> {
    return {
      ngModule: DataTransformerModule,
      providers: [provideDataTransformerFilters(filters)],
    };
  }
}
