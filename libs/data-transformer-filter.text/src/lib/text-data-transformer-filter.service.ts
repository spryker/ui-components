import { Injectable } from '@angular/core';
import { DataTransformerService } from '@spryker/data-transformer';
import {
  DataFilterTransformerByPropName,
  DataTransformerFilter,
  DataTransformerFilterByValue,
  DataTransformerFilterConfig,
  DataTransformerFilterData,
} from '@spryker/data-transformer-filter';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Filters data by value that matches with the prop value.
 */
@Injectable({ providedIn: 'root' })
export class TextDataTransformerFilter implements DataTransformerFilter {
  constructor(private dataTransformerService: DataTransformerService) {}

  filter(
    data: DataTransformerFilterData,
    options: DataTransformerFilterConfig,
    byValue: DataTransformerFilterByValue,
    transformerByPropName: DataFilterTransformerByPropName,
  ): Observable<DataTransformerFilterData> {
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
          propNames.some((propName) =>
            transformedValuesByPropNames?.[
              propName
            ].some((byTransformedValue) =>
              String(row[propName]).includes(String(byTransformedValue)),
            ),
          ),
        ),
      ),
    );
  }
}
