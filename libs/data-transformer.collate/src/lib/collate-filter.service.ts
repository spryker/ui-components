import { Inject, Injectable, Injector } from '@angular/core';
import { InjectionTokenType } from '@spryker/utils';

import { CollateFiltersTypesToken } from './tokens';
import {
  CollateFilterConfig,
  CollateFiltersDeclaration,
  CollateFiltersRegistry,
  CollateFiltersRegistryType,
} from './types';

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
    data: Record<string, unknown>[],
    options: CollateFilterConfig,
    byValue: unknown[],
    byValueTransformer: {
      [propName: string]: string;
    },
  ): Record<string, unknown>[] {
    if (!this.isFilterRegisteredType(type)) {
      throw Error(`CollateFilterService: Unknown filter type ${type}`);
    }

    const filterService = this.injector.get(this.filters[type]);

    return filterService.filter(data, options, byValue, byValueTransformer);
  }

  private isFilterRegisteredType(
    type: CollateFiltersRegistryType,
  ): type is keyof CollateFiltersRegistry {
    return type in this.filters;
  }
}
