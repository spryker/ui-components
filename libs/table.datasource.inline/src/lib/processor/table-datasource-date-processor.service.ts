import { Injectable } from '@angular/core';
import { toIsoDateFormat } from '@spryker/utils';

import { TableDatasourceProcessor } from '../types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceDateProcessor implements TableDatasourceProcessor {
  preprocess(value: string): number {
    return new Date(value).getTime();
  }

  postprocess(value: string): string {
    return toIsoDateFormat(value);
  }
}
