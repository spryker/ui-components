import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { combineLatest, Observable, of } from 'rxjs';

import {
  ArrayMapDataTransformerConfig,
  ArrayMapDataTransformerData,
  ArrayMapDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class ArrayMapDataTransformerService
  implements
    DataTransformer<ArrayMapDataTransformerData, ArrayMapDataTransformerDataT>
{
  constructor(private dataTransformerService: DataTransformerService) {}

  transform(
    data: ArrayMapDataTransformerData,
    config: ArrayMapDataTransformerConfig,
  ): Observable<ArrayMapDataTransformerDataT> {
    return data.length
      ? combineLatest(
          data.map((dataItem) =>
            this.dataTransformerService.transform(dataItem, config.mapItems),
          ),
        )
      : of(data);
  }
}
