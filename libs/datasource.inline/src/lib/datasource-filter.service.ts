import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { DatasourceFiltersToken } from './tokens';
import {
  DatasourceFilterOptions,
  DatasourceFiltersDeclaration,
  DatasourceFilterValue,
  DatasourceInlineConfigPreprocessor,
} from './types';

/**
 * Collects {@link DatasourceFiltersDeclaration} by {@link DatasourceFiltersToken} and invoke filter method.
 */
@Injectable({ providedIn: 'root' })
export class DatasourceFilterService {
  private filterTypes: DatasourceFiltersDeclaration = this.datasourceFilters?.reduce(
    (allFilterTypes, filterType) => ({ ...allFilterTypes, ...filterType }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(DatasourceFiltersToken)
    private datasourceFilters: InjectionTokenType<
      typeof DatasourceFiltersToken
    >,
  ) {}

  filter(
    type: string,
    data: DataRow[],
    options: DatasourceFilterOptions,
    byValue: DatasourceFilterValue,
    columnProcessors: DatasourceInlineConfigPreprocessor,
  ): DataRow[] {
    const filterType = this.filterTypes[type];

    if (!filterType) {
      throw new Error(
        `DatasourceFilterService: Filter type '${type}' is not registered!`,
      );
    }

    const filterService = this.injector.get(filterType);

    return filterService.filter(data, options, byValue, columnProcessors);
  }
}
