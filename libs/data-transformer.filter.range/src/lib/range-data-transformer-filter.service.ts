import { Injectable, inject } from '@angular/core';
import { DataTransformerService, DataTransformerType } from '@spryker/data-transformer';
import {
    DataFilterTransformerByPropName,
    DataTransformerFilter,
    DataTransformerFilterByValue,
    DataTransformerFilterConfig,
    DataTransformerFilterData,
} from '@spryker/data-transformer.collate';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RangeDataTransformerFilterValue {
    from?: unknown;
    to?: unknown;
}

/**
 * Filters data by value that is in range with the prop value.
 */
@Injectable({ providedIn: 'root' })
export class RangeDataTransformerFilterService implements DataTransformerFilter {
    private dataTransformerService = inject(DataTransformerService);

    filter(
        data: DataTransformerFilterData,
        options: DataTransformerFilterConfig,
        byValue: DataTransformerFilterByValue,
        transformerByPropName: DataFilterTransformerByPropName,
    ): Observable<DataTransformerFilterData> {
        if (!this.isFilterValue(byValue)) {
            return of(data);
        }

        const propNames = Array.isArray(options.propNames) ? options.propNames : [options.propNames];
        const propNameFrom = propNames[0];
        const propNameTo = propNames.length !== 1 ? propNames[1] : propNames[0];
        const transformedValuesByPropNames$ = propNames.reduce((allPropNamesData, propName) => {
            const transformedValues = transformerByPropName?.[propName]
                ? forkJoin(
                      byValue.map((valueToCompare) =>
                          forkJoin({
                              from: this.dataTransformerService.transform(valueToCompare.from, {
                                  type: transformerByPropName[propName] as DataTransformerType,
                              }),
                              to: this.dataTransformerService.transform(valueToCompare.to, {
                                  type: transformerByPropName[propName] as DataTransformerType,
                              }),
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
            map((transformedValuesByPropNames: Record<string, RangeDataTransformerFilterValue[]>) => {
                const isValueFrom = transformedValuesByPropNames?.[propNameFrom].some(
                    (byTransformedValue) => byTransformedValue.from,
                );
                const isValueTo = transformedValuesByPropNames?.[propNameTo].some(
                    (byTransformedValue) => byTransformedValue.to,
                );

                if (isValueFrom && isValueTo) {
                    return data.filter((row) => {
                        const columnsFromData = row[propNameFrom] as any;
                        const columnsToData = row[propNameTo] as any;

                        return (
                            transformedValuesByPropNames?.[propNameFrom].some(
                                (byTransformedValue) => columnsFromData >= (byTransformedValue.from as any),
                            ) &&
                            transformedValuesByPropNames?.[propNameTo].some(
                                (byTransformedValue) => columnsToData <= (byTransformedValue.to as any),
                            )
                        );
                    });
                }

                if (isValueFrom) {
                    return data.filter((row) => {
                        const columnsData = row[propNameFrom] as any;

                        return transformedValuesByPropNames?.[propNameFrom].some(
                            (byTransformedValue) => columnsData >= (byTransformedValue.from as any),
                        );
                    });
                }

                if (isValueTo) {
                    return data.filter((row) => {
                        const columnsData = row[propNameTo] as any;

                        return transformedValuesByPropNames?.[propNameTo].some(
                            (byTransformedValue) => columnsData <= (byTransformedValue.to as any),
                        );
                    });
                }

                return data;
            }),
        );
    }

    private isFilterValue(args: DataTransformerFilterByValue): args is RangeDataTransformerFilterValue[] {
        return args.every((arg: any) => arg && typeof arg === 'object' && ('from' in arg || 'to' in arg));
    }
}
