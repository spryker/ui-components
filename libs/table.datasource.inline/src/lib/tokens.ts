import { InjectionToken, Provider } from '@angular/core';

import { TableFiltrationTypesDeclaration } from './types';

export const TableFiltrationToken = new InjectionToken<
  TableFiltrationTypesDeclaration[]
>('TableFilterParsersToken');

export function provideTableFiltrationServices(filterParsers: any): Provider {
  return {
    provide: TableFiltrationToken,
    useValue: filterParsers,
    multi: true,
  };
}
