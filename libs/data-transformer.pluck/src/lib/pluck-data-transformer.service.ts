import { Injectable } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';

import {
  PluckDataTransformerConfig,
  PluckDataTransformerData,
  PluckDataTransformerDataT,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class PluckDataTransformerService
  implements
    DataTransformer<PluckDataTransformerData, PluckDataTransformerDataT> {
  transform(
    data: PluckDataTransformerData,
    config: PluckDataTransformerConfig,
  ): Observable<PluckDataTransformerDataT> {
    const properties = config.path.split('.');
    let value = { ...data };

    if (!properties.length) {
      return of(undefined);
    }

    for (let i = 0; i < properties.length; i++) {
      const propertyKey = properties[i] as keyof PluckDataTransformerData;

      if (!value.hasOwnProperty(propertyKey)) {
        return of(undefined);
      }

      value = value[propertyKey];
    }

    return of(value);
  }
}
