import { Injectable } from '@angular/core';
import { toIsoDateFormat } from '@spryker/utils';

import { TableDatasourceProcessor } from '../types';

/**
 * Processes value as date and returns it's Unix time.
 */
@Injectable({ providedIn: 'root' })
export class TableDatasourceDateProcessor implements TableDatasourceProcessor {
  preprocess(value: unknown): number {
    return new Date(String(value)).getTime();
  }

  postprocess(value: number): string {
    return toIsoDateFormat(new Date(value));
  }
}
