import { Injectable, Injector } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';
import { map, switchAll, switchMap } from 'rxjs/operators';

import { CollateDataConfiguratorService } from './collate-data-configurator.service';
import { CollateFilterService } from './collate-filter.service';
import {
  CollateDataConfig,
  CollateDataTransformerConfig,
  CollateDataTransformerData,
  CollateDataTransformerDataT,
  CollateFilterConfig,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class CollateDataTransformerService
  implements
    DataTransformer<CollateDataTransformerData, CollateDataTransformerDataT> {
  constructor(
    private collateFilter: CollateFilterService,
    private collateDataConfigurator: CollateDataConfiguratorService,
  ) {}

  transform(
    data: CollateDataTransformerData,
    config: CollateDataTransformerConfig,
    injector: Injector,
  ): Observable<CollateDataTransformerDataT> {
    return this.collateDataConfigurator
      .resolve(config.configurator, injector)
      .pipe(
        map((configurator) =>
          this.filterData(config, configurator, data).pipe(
            map((filteredData) => {
              const sortingConfig = configurator.sorting;
              const total = filteredData.length;
              let copiedData = [...filteredData];

              if (configurator.pageSize && configurator.page) {
                copiedData = this.paginateData(
                  configurator.page,
                  configurator.pageSize,
                  copiedData,
                );
              }

              if (sortingConfig?.sortBy && sortingConfig?.sortDirection) {
                copiedData.sort((a, b) => {
                  const comparison = this.sortData(
                    a,
                    b,
                    sortingConfig.sortBy as string,
                  );

                  return config.sortDirection === 'desc'
                    ? comparison * -1
                    : comparison;
                });
              }

              return {
                data: copiedData,
                total,
                page: configurator.page ?? 1,
                pageSize: configurator.pageSize ?? copiedData.length,
              };
            }),
          ),
        ),
        switchAll(),
      );
  }

  private filterData(
    collateConfig: CollateDataTransformerConfig,
    configuratorConfig: CollateDataConfig,
    data: CollateDataTransformerData,
  ): Observable<CollateDataTransformerData> {
    const filters =
      configuratorConfig.filter && collateConfig.filter
        ? Object.entries(collateConfig.filter)
        : [];

    return filters
      .reduce((prevData$, [key, options]) => {
        return prevData$.pipe(
          switchMap((currentData) => {
            const byValue = (configuratorConfig.filter as any)[key];
            const byValueToCompare = Array.isArray(byValue)
              ? byValue
              : [byValue];

            if (byValue !== null && byValue !== undefined) {
              return prevData$.pipe(
                switchMap((newData) =>
                  this.collateFilter.filter(
                    options.type,
                    newData,
                    options,
                    byValueToCompare,
                    collateConfig.transformerByPropName,
                  ),
                ),
              );
            }

            return prevData$;
          }),
        );
      }, of(data))
      .pipe(
        map((filteredData) => {
          if (!configuratorConfig.search || !collateConfig.search) {
            return of(filteredData);
          }

          return this.collateFilter.filter(
            'text',
            filteredData,
            collateConfig.search as CollateFilterConfig,
            [configuratorConfig.search],
            collateConfig.transformerByPropName,
          );
        }),
        switchAll(),
      );
  }

  private sortData(a: any, b: any, sortBy: string): number {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }

    return 0;
  }

  private paginateData(
    page: number,
    pageSize: number,
    data: CollateDataTransformerData,
  ): CollateDataTransformerData {
    const slicedData = data.slice((page - 1) * pageSize, page * pageSize);

    if (slicedData.length) {
      return slicedData;
    }

    const dataWithFirstPage = data.slice(0, pageSize);

    return dataWithFirstPage;
  }
}
