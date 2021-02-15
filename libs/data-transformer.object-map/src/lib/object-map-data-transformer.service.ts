import { Injectable } from '@angular/core';
import {
  DataTransformer,
  DataTransformerService,
} from '@spryker/data-transformer';
import { Observable, of, from } from 'rxjs';

import {
  ObjectMapDataTransformerConfig,
  ObjectMapDataTransformerData,
  ObjectMapDataTransformerDataT,
} from './types';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ObjectMapDataTransformerService
  implements
    DataTransformer<
      ObjectMapDataTransformerData,
      ObjectMapDataTransformerDataT
    > {
  constructor(private dataTransformerService: DataTransformerService) {}

  transform(
    data: ObjectMapDataTransformerData,
    config: ObjectMapDataTransformerConfig,
  ): Observable<ObjectMapDataTransformerDataT> {
    const dataToTransform = { ...data };

    for (const [propName, value] of Object.entries(dataToTransform)) {
      if (!config.mapProps.hasOwnProperty(propName)) {
        continue;
      }

      dataToTransform[propName] = this.dataTransformerService.transform(
        value,
        config.mapProps[propName],
      );
    }
    console.log(dataToTransform);
    return from(Object.entries(dataToTransform)).pipe(
      scan((acc, curr) => {
        console.log(acc, curr);
        return acc;
      }, data),
    );
  }
}
