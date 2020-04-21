import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PluckModule } from '@spryker/utils';
import { DynamicIoModule } from 'ng-dynamic-component';

import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { TABLE_FILTERS_TOKEN } from './tokens';
import { TableFiltersDeclaration } from './types';

@NgModule({
  imports: [CommonModule, DynamicIoModule, PluckModule],
  declarations: [TableFiltersFeatureComponent],
  exports: [TableFiltersFeatureComponent],
})
export class TableFiltersFeatureModule {
  static withFilterComponents(
    filters: TableFiltersDeclaration,
  ): ModuleWithProviders<TableFiltersFeatureModule> {
    return {
      ngModule: TableFiltersFeatureModule,
      providers: [
        {
          provide: TABLE_FILTERS_TOKEN,
          useValue: filters,
          multi: true,
        },
      ],
    };
  }
}
