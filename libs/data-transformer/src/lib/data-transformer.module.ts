import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideDataTransformerType } from './token';
import { DataTransformerTypesDeclaration } from './types';

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
}
