import { Injectable } from '@angular/core';
import { DataTransformerService } from '@spryker/data-transformer';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CollateFilter,
  CollateFilterByValue,
  CollateFilterConfig,
  CollateFilterData,
  CollateTransformerByPropName,
} from '../types';

/**
 * Filters data by value that strictly equals to the prop value.
 */
@Injectable({ providedIn: 'root' })
export class CollateEqualsFilter implements CollateFilter {
  constructor(private dataTransformerService: DataTransformerService) {}

  filter(
    data: CollateFilterData,
    options: CollateFilterConfig,
    byValue: CollateFilterByValue,
    transformerByPropName: CollateTransformerByPropName,
  ): Observable<CollateFilterData> {
    const propNames = Array.isArray(options.propNames)
      ? options.propNames
      : [options.propNames];
    const transformedValuesByPropNames$ = propNames.reduce(
      (allPropNamesData, propName) => {
        const transformedValues = transformerByPropName?.[propName]
          ? forkJoin(
              byValue.map((valueToCompare) =>
                this.dataTransformerService.transform(valueToCompare, {
                  type: transformerByPropName[propName],
                }),
              ),
            )
          : of(byValue);

        return {
          ...allPropNamesData,
          [propName]: transformedValues,
        };
      },
      {},
    );

    return forkJoin(transformedValuesByPropNames$).pipe(
      map((transformedValuesByPropNames: Record<string, unknown[]>) =>
        data.filter((row) =>
          propNames.some((propName) => {
            if (!byValue.length) {
              return true;
            }

            return transformedValuesByPropNames?.[propName].includes(
              row[propName],
            );
          }),
        ),
      ),
    );
  }
}
