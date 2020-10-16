import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { TableDataRow } from '@spryker/table';
import { InjectionTokenType } from '@spryker/utils';

import { TableFiltrationToken } from './tokens';
import {
  TableFiltrationTypesDeclaration,
  TableFiltrationOptions,
  TableFiltrationByValue,
} from './types';

@Injectable({ providedIn: 'root' })
export class TableFiltrationService {
  filtrationClasses: TableFiltrationTypesDeclaration = this.filtrationTypes?.reduce(
    (flirtations, filtration) => ({ ...flirtations, ...filtration }),
    {},
  );

  constructor(
    private injector: Injector,
    @Optional()
    @Inject(TableFiltrationToken)
    private filtrationTypes: InjectionTokenType<typeof TableFiltrationToken>,
  ) {}

  filtration(
    type: string,
    data: TableDataRow[],
    filtrationOptions: TableFiltrationOptions,
    filterByValue: TableFiltrationByValue,
  ): TableDataRow[] {
    const filtrationClass = this.filtrationClasses[type];

    if (!filtrationClass) {
      throw new Error(
        `TableFilterParsersService: Filtration type '${type}' is not registered!`,
      );
    }

    const filtrationService = this.injector.get(filtrationClass);

    return filtrationService.filtration(data, filtrationOptions, filterByValue);
  }
}
