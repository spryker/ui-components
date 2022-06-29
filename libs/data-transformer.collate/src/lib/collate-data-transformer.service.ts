import { Injectable, Injector } from '@angular/core';
import { DataTransformer } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';
import { map, switchMap, delay, tap } from 'rxjs/operators';

import { DataTransformerConfiguratorService } from './data-transformer-configurator.service';
import { DataTransformerFilterService } from './data-transformer-filter.service';
import {
  CollateDataTransformerConfig,
  CollateDataTransformerData,
  CollateDataTransformerDataT,
  DataTransformerConfiguratorConfigT,
  DataTransformerFilterConfig,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class CollateDataTransformerService
  implements
    DataTransformer<CollateDataTransformerData, CollateDataTransformerDataT>
{
  constructor(
    private dataTransformerFilter: DataTransformerFilterService,
    private collateDataConfigurator: DataTransformerConfiguratorService,
  ) {}

  transform(
    data: CollateDataTransformerData,
    config: CollateDataTransformerConfig,
    injector: Injector,
  ): Observable<CollateDataTransformerDataT> {
    return this.collateDataConfigurator
      .resolve(config.configurator, injector)
      .pipe(
        switchMap((configurator) =>
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
        delay(0),
      );
  }

  private filterData(
    collateConfig: CollateDataTransformerConfig,
    configuratorConfig: DataTransformerConfiguratorConfigT,
    data: CollateDataTransformerData,
  ): Observable<CollateDataTransformerData> {
    const filters =
      configuratorConfig.filter && collateConfig.filter
        ? Object.entries(collateConfig.filter)
        : [];

    return filters
      .reduce((prevData$, [key, options]) => {
        return prevData$.pipe(
          switchMap((prevData) => {
            const byValue = (configuratorConfig.filter as any)[key];
            const byValueToCompare = Array.isArray(byValue)
              ? byValue
              : [byValue];

            if (byValue !== null && byValue !== undefined) {
              return this.dataTransformerFilter.filter(
                options.type,
                prevData,
                options,
                byValueToCompare,
                collateConfig.transformerByPropName,
              );
            }

            return of(prevData);
          }),
        );
      }, of(data))
      .pipe(
        switchMap((filteredData) => {
          if (!configuratorConfig.search || !collateConfig.search) {
            return of(filteredData);
          }

          return this.dataTransformerFilter.filter(
            collateConfig.search.type,
            filteredData,
            collateConfig.search as DataTransformerFilterConfig,
            [configuratorConfig.search],
            collateConfig.transformerByPropName,
          );
        }),
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
