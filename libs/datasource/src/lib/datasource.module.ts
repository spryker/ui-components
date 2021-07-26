import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { provideDatasources } from './token';
import { DatasourceTypesDeclaration } from './types';

@NgModule({
  imports: [CommonModule],
})
export class DatasourceModule {
  static withDatasources(
    datasources: DatasourceTypesDeclaration,
  ): ModuleWithProviders<DatasourceModule> {
    return {
      ngModule: DatasourceModule,
      providers: [provideDatasources(datasources)],
    };
  }
}
