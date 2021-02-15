import { Injectable } from '@angular/core';
import {
  CollateDataTransformerConfig,
  CollateDataTransformerData,
  CollateDataTransformerDataT,
} from './types';
import { DataTransformer } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChainDataCollateService
  implements
    DataTransformer<CollateDataTransformerData, CollateDataTransformerDataT> {
  transform(
    data: CollateDataTransformerData,
    config: CollateDataTransformerConfig,
  ): Observable<CollateDataTransformerDataT> {
    return of([]);
  }
}
