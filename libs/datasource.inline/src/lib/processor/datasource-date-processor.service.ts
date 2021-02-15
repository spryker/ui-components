import { Injectable } from '@angular/core';
import { toIsoDateFormat } from '@spryker/utils';

import { DatasourceProcessor } from '../types';

/**
 * Processes value as date and returns it's Unix time.
 */
@Injectable({ providedIn: 'root' })
export class DatasourceDateProcessor implements DatasourceProcessor {
  preprocess(value: unknown): number {
    return new Date(String(value)).getTime();
  }

  postprocess(value: number): string {
    return toIsoDateFormat(new Date(value));
  }
}
