import { Injectable, Injector, inject } from '@angular/core';
import { DataTransformer, DataTransformerService } from '@spryker/data-transformer';
import { forkJoin, Observable, of, switchMap } from 'rxjs';

import { ObjectMapDataTransformerConfig, ObjectMapDataTransformerData, ObjectMapDataTransformerDataT } from './types';

@Injectable({
    providedIn: 'root',
})
export class ObjectMapDataTransformerService
    implements DataTransformer<ObjectMapDataTransformerData, ObjectMapDataTransformerDataT>
{
    protected dataTransformerService = inject(DataTransformerService);

    transform(
        data: ObjectMapDataTransformerData,
        config: ObjectMapDataTransformerConfig,
    ): Observable<ObjectMapDataTransformerDataT | unknown> {
        return of(Object.entries(data)).pipe(
            switchMap((dataArray) => {
                const dataToTransform: ObjectMapDataTransformerDataT = {};

                for (const [propName, value] of dataArray) {
                    dataToTransform[propName] = config.mapProps.hasOwnProperty(propName)
                        ? this.dataTransformerService.transform(value, config.mapProps[propName])
                        : of(value);
                }

                return forkJoin(dataToTransform as any);
            }),
        );
    }
}
