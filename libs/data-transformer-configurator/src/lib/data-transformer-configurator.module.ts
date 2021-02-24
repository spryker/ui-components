import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideDataTransformerConfiguratorTypes } from './token';
import { DataTransformerConfiguratorDeclaration } from './types';

@NgModule({
  imports: [CommonModule],
})
export class DataTransformerConfiguratorModule {
  static withConfigurators(
    dataConfigurators: DataTransformerConfiguratorDeclaration,
  ): ModuleWithProviders<DataTransformerConfiguratorModule> {
    return {
      ngModule: DataTransformerConfiguratorModule,
      providers: [provideDataTransformerConfiguratorTypes(dataConfigurators)],
    };
  }
}
