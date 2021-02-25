import { Injectable } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { DateService } from '@spryker/utils/date';
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
  constructor(private dateService: DateService) {}

  transform(
    data: DateParseDataTransformerData,
    config: DateParseDataTransformerConfig,
  ): Observable<DateParseDataTransformerDataT> {
    return of(this.dateService.parse(data).getTime());
  }
}
