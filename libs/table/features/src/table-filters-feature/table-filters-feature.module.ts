import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { DynamicIoModule } from 'ng-dynamic-component';
import { PluckModule } from '@spryker/utils';

import { TableFiltersDeclaration } from './table-filters-feature';

export const TABLE_FILTERS_TOKEN = new InjectionToken<
  TableFiltersDeclaration[]
>('TABLE_FILTERS_TOKEN');

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
