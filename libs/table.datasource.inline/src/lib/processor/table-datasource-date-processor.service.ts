import { Injectable } from '@angular/core';
import { toIsoDateFormat } from '@spryker/utils';

import { TableDatasourceProcessor } from '../types';

/**
 * Processes date value.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceDateProcessor implements TableDatasourceProcessor {
  preprocess(value: string): number {
    return new Date(value).getTime();
  }

  postprocess(value: string): string {
    return toIsoDateFormat(value);
  }
}
