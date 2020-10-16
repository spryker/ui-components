import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideTableFiltrationServices } from './tokens';

@NgModule({
  imports: [CommonModule],
})
export class TableDatasourceInlineModule {
  static withFiltration(
    filterParsers: TableDatasourceInlineModule,
  ): ModuleWithProviders<TableDatasourceInlineModule> {
    return {
      ngModule: TableDatasourceInlineModule,
      providers: [provideTableFiltrationServices(filterParsers)],
    };
  }
}
