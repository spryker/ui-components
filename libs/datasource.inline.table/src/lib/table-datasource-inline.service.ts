import { Injectable, Injector } from '@angular/core';
import { DataTransformerService } from '@spryker/data-transformer';
import { Datasource, DatasourceConfig } from '@spryker/datasource';
import { TableData } from '@spryker/table';
import { Observable } from 'rxjs';

import { TableDatasourceInlineConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceInlineService implements Datasource<TableData> {
  constructor(private dataTransformerService: DataTransformerService) {}

  resolve(
    injector: Injector,
    config: TableDatasourceInlineConfig,
  ): Observable<TableData> {
    const preprocessConfig: Record<string, DatasourceConfig> = {};
    const postprocessConfig: Record<string, DatasourceConfig> = {};

    for (const [key, value] of Object.entries(
      config.transformerByPropName ?? {},
    )) {
      if (value === 'date') {
        preprocessConfig[key] = {
          type: 'date-parse',
        };

        postprocessConfig[key] = {
          type: 'date-serialize',
        };
      }
    }

    const transformConfig = {
      type: 'chain',
      transformers: [
        {
          type: 'array-map',
          mapItems: {
            type: 'object-map',
            mapProps: preprocessConfig,
          },
        },
        {
          type: 'collate',
          configurator: {
            type: 'table',
          },
          filter: config.filter,
          search: config.search,
        },
        {
          type: 'lens',
          path: 'data',
          transformer: {
            type: 'array-map',
            mapItems: {
              type: 'object-map',
              mapProps: postprocessConfig,
            },
          },
        },
      ],
      transformerByPropName: config.transformerByPropName,
    };

    return this.dataTransformerService.transform(
      config.data,
      transformConfig,
      injector,
    ) as Observable<TableData>;
  }
}