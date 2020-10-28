import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { TableDataRow } from '@spryker/table';
import { InjectionTokenType } from '@spryker/utils';

import { TableDatasourceFiltersToken } from './tokens';
import {
  TableDatasourceFiltersDeclaration,
  TableDatasourceFilterOptions,
  TableDatasourceFilterValue,
  TableDatasourceInlineConfigPreprocessor,
} from './types';

/**
 * Collects {@link TableDatasourceFiltersDeclaration} by {@link TableDatasourceFiltersToken} and invoke filter method.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceFilterService {
  private filterTypes: TableDatasourceFiltersDeclaration = this.datasourceFilters?.reduce(
    (allFilterTypes, filterType) => ({ ...allFilterTypes, ...filterType }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(TableDatasourceFiltersToken)
    private datasourceFilters: InjectionTokenType<
      typeof TableDatasourceFiltersToken
    >,
  ) {}

  filter(
    type: string,
    data: TableDataRow[],
    options: TableDatasourceFilterOptions,
    byValue: TableDatasourceFilterValue,
    columnProcessors: TableDatasourceInlineConfigPreprocessor,
  ): TableDataRow[] {
    const filterType = this.filterTypes[type];

    if (!filterType) {
      throw new Error(
        `TableDatasourceFilterService: Filter type '${type}' is not registered!`,
      );
    }

    const filterService = this.injector.get(filterType);

    return filterService.filter(data, options, byValue, columnProcessors);
  }
}
