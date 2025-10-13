import { Injectable, Injector, inject } from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { Observable, switchMap } from 'rxjs';

import { TableDataConfiguratorService } from './data-configurator.service';
import { TableData } from './table';

@Injectable()
export class TableDatasourceService {
    protected injector = inject(Injector);
    protected dataConfiguratorService = inject(TableDataConfiguratorService);
    protected datasourceService = inject(DatasourceService);

    resolve(config: DatasourceConfig): Observable<TableData> {
        return this.dataConfiguratorService.config$.pipe(
            switchMap((dataConfig) => {
                return this.datasourceService.resolve<TableData>(this.injector, config, dataConfig);
            }),
        );
    }
}
