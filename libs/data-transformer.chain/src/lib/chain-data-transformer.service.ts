import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { Observable, of, from } from 'rxjs';

import {
  ChainDataTransformerConfig,
  ChainDataTransformerData,
  ChainDataTransformerDataT,
} from './types';
import { reduce, tap, switchMap } from 'rxjs/operators';

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
      reduce((prevData, currentConfig) => {
        return prevData.pipe(
          switchMap((value) =>
            this.dataTransformerService.transform(value, currentConfig),
          ),
        );
      }, of(data)),
      switchMap((result) => result),
    );
  }
}
