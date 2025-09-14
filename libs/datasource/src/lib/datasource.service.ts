import { Injectable, Injector, inject } from '@angular/core';
import { DataTransformerService } from '@spryker/data-transformer';
import { Observable, of } from 'rxjs';
import { DatasourceTypesToken } from './token';
import { Datasource, DatasourceConfig, DatasourceRegistry, DatasourceType, DatasourceTypesDeclaration } from './types';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DatasourceService {
    private dataTransformerService = inject(DataTransformerService);
    private dataSourceTypes = inject(DatasourceTypesToken, {
        optional: true,
    });

    dataSources: Partial<DatasourceTypesDeclaration> =
        this.dataSourceTypes?.reduce((dataSources, dataSource) => ({ ...dataSources, ...dataSource }), {}) ?? {};

    resolve<D = unknown>(injector: Injector, config: DatasourceConfig, context?: unknown): Observable<D> {
        if (!this.isDatasourceRegisteredType(config.type)) {
            throw Error(`DatasourceService: Unknown datasource type ${String(config.type)}`);
        }

        const dataSource: Datasource<unknown, unknown> = injector.get(this.dataSources[config.type]);

        return dataSource.resolve(injector, config, context).pipe(
            switchMap((data) => {
                return (
                    config.transform
                        ? this.dataTransformerService.transform(data, config.transform, injector)
                        : of(data)
                ) as Observable<D>;
            }),
        );
    }

    private isDatasourceRegisteredType(type: DatasourceType): type is keyof DatasourceRegistry {
        return type in this.dataSources;
    }
}
