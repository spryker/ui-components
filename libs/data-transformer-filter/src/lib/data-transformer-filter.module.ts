import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideDataTransformerFilters } from './token';
import { DataTransformerFiltersDeclaration } from './types';

@NgModule({
  imports: [CommonModule],
})
export class DataTransformerFilterModule {
  static withFilters(
    filters: DataTransformerFiltersDeclaration,
  ): ModuleWithProviders<DataTransformerFilterModule> {
    return {
      ngModule: DataTransformerFilterModule,
      providers: [provideDataTransformerFilters(filters)],
    };
  }
}
