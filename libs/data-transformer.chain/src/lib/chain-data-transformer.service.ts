import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    return config.transformers.reduce(
      (prevData$, currentConfig) =>
        prevData$.pipe(
          switchMap((prevData) =>
            this.dataTransformerService.transform(prevData, currentConfig),
          ),
        ),
      of(data),
    );
  }
}
