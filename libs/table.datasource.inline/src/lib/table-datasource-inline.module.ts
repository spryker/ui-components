import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  provideTableDatasourceFilters,
  provideTableDatasourceProcessors,
} from './tokens';
import { TableDatasourceFiltersDeclaration } from './types';

@NgModule({
  imports: [CommonModule],
})
export class TableDatasourceInlineModule {
  static withFilters(
    filters: TableDatasourceFiltersDeclaration,
  ): ModuleWithProviders<TableDatasourceInlineModule> {
    return {
      ngModule: TableDatasourceInlineModule,
      providers: [provideTableDatasourceFilters(filters)],
    };
  }

  static withProcessors(
    processors: any,
  ): ModuleWithProviders<TableDatasourceInlineModule> {
    return {
      ngModule: TableDatasourceInlineModule,
      providers: [provideTableDatasourceProcessors(processors)],
    };
  }
}
