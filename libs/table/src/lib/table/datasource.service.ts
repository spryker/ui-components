import { Injectable, Injector } from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableDataConfiguratorService } from './data-configurator.service';
import { TableData } from './table';

@Injectable()
export class TableDatasourceService {
    constructor(
        private injector: Injector,
        private dataConfiguratorService: TableDataConfiguratorService,
        private datasourceService: DatasourceService,
    ) {}

    resolve(config: DatasourceConfig): Observable<TableData> {
        return this.dataConfiguratorService.config$.pipe(
            switchMap((dataConfig) => {
                return this.datasourceService.resolve<TableData>(this.injector, config, dataConfig);
            }),
        );
    }
}
