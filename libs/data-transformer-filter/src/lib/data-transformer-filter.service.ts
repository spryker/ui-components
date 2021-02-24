import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { DataTransformerFiltersTypesToken } from './token';
import {
  DataTransformerFilterConfig,
  DataTransformerFiltersDeclaration,
  DataTransformerFiltersRegistry,
  DataTransformerFiltersRegistryType,
  DataTransformerFilterData,
  DataTransformerFilterByValue,
  DataFilterTransformerByPropName,
  DataTransformerFilter,
} from './types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataTransformerFilterService {
  private filters: DataTransformerFiltersDeclaration = this.filtersTypes.reduce(
    (filters, filter) => ({ ...filters, ...filter }),
    {},
  );

  constructor(
    private injector: Injector,
    @Inject(DataTransformerFiltersTypesToken)
    private filtersTypes: InjectionTokenType<
      typeof DataTransformerFiltersTypesToken
    >,
  ) {}

  filter(
    type: string,
    data: DataTransformerFilterData,
    options: DataTransformerFilterConfig,
    byValue: DataTransformerFilterByValue,
    transformerByPropName?: DataFilterTransformerByPropName,
  ): Observable<DataTransformerFilterData> {
    if (!this.isFilterRegisteredType(type)) {
      throw Error(`DataTransformerFilterService: Unknown filter type ${type}`);
    }

    const filterService: DataTransformerFilter = this.injector.get(
      this.filters[type],
    );

    return filterService.filter(data, options, byValue, transformerByPropName);
  }

  private isFilterRegisteredType(
    type: DataTransformerFiltersRegistryType,
  ): type is keyof DataTransformerFiltersRegistry {
    return type in this.filters;
  }
}
