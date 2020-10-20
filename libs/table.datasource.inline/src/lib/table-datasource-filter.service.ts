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

@Injectable({ providedIn: 'root' })
export class TableDatasourceFilterService {
  private filterTypes: TableDatasourceFiltersDeclaration = this.datasourceFilters?.reduce(
    (filterTypes, filterType) => ({ ...filterTypes, ...filterType }),
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
    const filterClass = this.filterTypes[type];

    if (!filterClass) {
      throw new Error(
        `TableDatasourceFilterService: Filter type '${type}' is not registered!`,
      );
    }

    const filterService = this.injector.get(filterClass);

    return filterService.filter(data, options, byValue, columnProcessors);
  }
}
