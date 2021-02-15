import { Injectable } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';

import {
  DateParseDataTransformerConfig,
  DateParseDataTransformerData,
  DateParseDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class DateParseDataTransformerService
  implements
    DataTransformer<
      DateParseDataTransformerData,
      DateParseDataTransformerDataT
    > {
  transform(
    data: DateParseDataTransformerData,
    config: DateParseDataTransformerConfig,
  ): Observable<DateParseDataTransformerDataT> {
    return of(new Date(data).getTime());
  }
}
