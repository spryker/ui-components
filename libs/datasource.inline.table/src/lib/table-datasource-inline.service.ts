import { Injectable, Injector, inject } from '@angular/core';
import { DataTransformerConfig, DataTransformerService, DataTransformerType } from '@spryker/data-transformer';
import { Datasource } from '@spryker/datasource';
import { DatasourceInlineService } from '@spryker/datasource.inline';
import { TableData } from '@spryker/table';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableDatasourceInlineConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceInlineService implements Datasource<TableData> {
    private dataTransformerService = inject(DataTransformerService);
    private datasourceInlineService = inject(DatasourceInlineService);

    resolve(injector: Injector, config: TableDatasourceInlineConfig): Observable<TableData> {
        const preprocessConfig: Record<string, DataTransformerConfig> = {};
        const postprocessConfig: Record<string, DataTransformerConfig> = {};

        for (const [key, value] of Object.entries(config.transformerByPropName ?? {})) {
            if (value === 'date') {
                preprocessConfig[key] = {
                    type: 'date-parse' as DataTransformerType,
                };

                postprocessConfig[key] = {
                    type: 'date-serialize' as DataTransformerType,
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
        } as unknown as DataTransformerConfig;

        return this.datasourceInlineService
            .resolve(injector, config)
            .pipe(
                switchMap((data) => this.dataTransformerService.transform(data, transformConfig, injector)),
            ) as Observable<TableData>;
    }
}
