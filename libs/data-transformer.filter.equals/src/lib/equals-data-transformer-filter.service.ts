import { Injectable, inject } from '@angular/core';
import { DataTransformerService, DataTransformerType } from '@spryker/data-transformer';
import {
    DataFilterTransformerByPropName,
    DataTransformerFilter,
    DataTransformerFilterByValue,
    DataTransformerFilterConfig,
    DataTransformerFilterData,
} from '@spryker/data-transformer.collate';
import { forkJoin, Observable, of, map } from 'rxjs';

/**
 * Filters data by value that strictly equals to the prop value.
 */
@Injectable({ providedIn: 'root' })
export class EqualsDataTransformerFilterService implements DataTransformerFilter {
    protected dataTransformerService = inject(DataTransformerService);

    filter(
        data: DataTransformerFilterData,
        options: DataTransformerFilterConfig,
        byValue: DataTransformerFilterByValue,
        transformerByPropName: DataFilterTransformerByPropName,
    ): Observable<DataTransformerFilterData> {
        const propNames = Array.isArray(options.propNames) ? options.propNames : [options.propNames];
        const transformedValuesByPropNames$ = propNames.reduce((allPropNamesData, propName) => {
            const transformedValues = transformerByPropName?.[propName]
                ? forkJoin(
                      byValue.map((valueToCompare) =>
                          this.dataTransformerService.transform(valueToCompare, {
                              type: transformerByPropName[propName] as DataTransformerType,
                          }),
                      ),
                  )
                : of(byValue);

            return {
                ...allPropNamesData,
                [propName]: transformedValues,
            };
        }, {});

        return forkJoin(transformedValuesByPropNames$).pipe(
            map((transformedValuesByPropNames: Record<string, unknown[]>) =>
                data.filter((row) =>
                    propNames.some((propName) => {
                        if (!byValue.length) {
                            return true;
                        }

                        return transformedValuesByPropNames?.[propName].includes(row[propName]);
                    }),
                ),
            ),
        );
    }
}
