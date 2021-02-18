import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { from, Observable, of } from 'rxjs';
import { reduce, switchAll, switchMap } from 'rxjs/operators';

import {
  ChainDataTransformerConfig,
  ChainDataTransformerData,
  ChainDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class ChainDataTransformerService
  implements
    DataTransformer<ChainDataTransformerData, ChainDataTransformerDataT> {
  constructor(private dataTransformerService: DataTransformerService) {}

  transform(
    data: ChainDataTransformerData,
    config: ChainDataTransformerConfig,
  ): Observable<ChainDataTransformerDataT> {
    return from(config.transformers).pipe(
      reduce(
        (prevData$, currentConfig) =>
          prevData$.pipe(
            switchMap((value) =>
              this.dataTransformerService.transform(value, currentConfig),
            ),
          ),
        of(data),
      ),
      switchAll(),
    );
  }
}
