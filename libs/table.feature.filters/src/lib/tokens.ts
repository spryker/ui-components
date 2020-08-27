import { InjectionToken } from '@angular/core';

import { TableFiltersDeclaration } from './types';

export const TABLE_FILTERS_TOKEN = new InjectionToken<
  TableFiltersDeclaration[]
>('TABLE_FILTERS_TOKEN');
