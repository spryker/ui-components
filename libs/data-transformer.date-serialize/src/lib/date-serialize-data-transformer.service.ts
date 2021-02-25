import { Injectable } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { toIsoDateFormat } from '@spryker/utils';
import { Observable, of } from 'rxjs';

import {
  DateSerializeDataTransformerConfig,
  DateSerializeDataTransformerData,
  DateSerializeDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class DateSerializeDataTransformerService
  implements
    DataTransformer<
      DateSerializeDataTransformerData,
      DateSerializeDataTransformerDataT
    > {
  transform(
    data: DateSerializeDataTransformerData,
    config: DateSerializeDataTransformerConfig,
  ): Observable<DateSerializeDataTransformerDataT> {
    return of(toIsoDateFormat(new Date(data)));
  }
}
