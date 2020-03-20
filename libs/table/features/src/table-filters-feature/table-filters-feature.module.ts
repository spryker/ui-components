import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersFeatureComponent } from './table-filters-feature.component';
import { DynamicIoModule } from 'ng-dynamic-component';

import { TableFiltersDeclaration, TableFilterBase } from './table-filters-feature';

declare module '@spryker/table' {
  interface TableConfig {
    filters?: TableFilterBase[];
  }
}

export const TABLE_FILTERS_TOKEN = new InjectionToken<
  TableFiltersDeclaration[]
>('TABLE_FILTERS_TOKEN');

@NgModule({
  imports: [CommonModule, DynamicIoModule],
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
