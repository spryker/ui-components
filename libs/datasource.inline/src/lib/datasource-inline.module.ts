import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  provideDatasourceFilters,
  provideDatasourceProcessors,
} from './tokens';
import {
  DatasourceFiltersDeclaration,
  DatasourceProcessorsDeclaration,
} from './types';

@NgModule({
  imports: [CommonModule],
})
export class DatasourceInlineModule {
  static withFilters(
    filters: DatasourceFiltersDeclaration,
  ): ModuleWithProviders<DatasourceInlineModule> {
    return {
      ngModule: DatasourceInlineModule,
      providers: [provideDatasourceFilters(filters)],
    };
  }

  static withProcessors(
    processors: DatasourceProcessorsDeclaration,
  ): ModuleWithProviders<DatasourceInlineModule> {
    return {
      ngModule: DatasourceInlineModule,
      providers: [provideDatasourceProcessors(processors)],
    };
  }
}
