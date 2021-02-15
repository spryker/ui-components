import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';

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
    const datstst = config.transformers.reduce(
      (prevData, currentConfig) =>
        this.dataTransformerService.transform(prevData, currentConfig),
      data,
    );

    return datstst;
  }
}
