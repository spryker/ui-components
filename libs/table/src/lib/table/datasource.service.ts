import { Injectable, Injector, inject } from '@angular/core';
import { DatasourceConfig, DatasourceService } from '@spryker/datasource';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableDataConfiguratorService } from './data-configurator.service';
import { TableData } from './table';

@Injectable()
export class TableDatasourceService {
    private injector = inject(Injector);
    private dataConfiguratorService = inject(TableDataConfiguratorService);
    private datasourceService = inject(DatasourceService);

    resolve(config: DatasourceConfig): Observable<TableData> {
        return this.dataConfiguratorService.config$.pipe(
            switchMap((dataConfig) => {
                return this.datasourceService.resolve<TableData>(this.injector, config, dataConfig);
            }),
        );
    }
}
