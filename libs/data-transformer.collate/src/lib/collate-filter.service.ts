import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { CollateFiltersTypesToken } from './tokens';
import {
  CollateFilterConfig,
  CollateFiltersDeclaration,
  CollateFiltersRegistry,
  CollateFiltersRegistryType,
  CollateFilterData,
  CollateFilterByValue,
  CollateTransformerByPropName,
} from './types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollateFilterService {
  private filters: CollateFiltersDeclaration = this.filtersTypes.reduce(
    (filters, filter) => ({ ...filters, ...filter }),
    {},
  );

  constructor(
    private injector: Injector,
    @Inject(CollateFiltersTypesToken)
    private filtersTypes: InjectionTokenType<typeof CollateFiltersTypesToken>,
  ) {}

  filter(
    type: string,
    data: CollateFilterData,
    options: CollateFilterConfig,
    byValue: CollateFilterByValue,
    transformerByPropName?: CollateTransformerByPropName,
  ): Observable<CollateFilterData> {
    if (!this.isFilterRegisteredType(type)) {
      throw Error(`CollateFilterService: Unknown filter type ${type}`);
    }

    const filterService = this.injector.get(this.filters[type]);

    return filterService.filter(data, options, byValue, transformerByPropName);
  }

  private isFilterRegisteredType(
    type: CollateFiltersRegistryType,
  ): type is keyof CollateFiltersRegistry {
    return type in this.filters;
  }
}
