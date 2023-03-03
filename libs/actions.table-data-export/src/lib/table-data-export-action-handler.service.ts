import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionHandler } from '@spryker/actions';
import { CoreTableComponent, TableDataConfiguratorService, TableLocatorService } from '@spryker/table';
import { AnyContext, ContextService, FileSaverService } from '@spryker/utils';
import { combineLatest, map, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CollectedTableData, TableDataExportActionConfig } from './types';

@Injectable({
    providedIn: 'root',
})
export class TableDataExportActionHandlerService implements ActionHandler<unknown, unknown> {
    protected tableData: CollectedTableData;
    protected defaultFileName = 'table-data';
    protected defaultContentType = 'text/csv';

    constructor(private http: HttpClient) {}

    handleAction(injector: Injector, config: TableDataExportActionConfig, context: unknown): Observable<unknown> {
        config = { ...config };

        const contextService = injector.get(ContextService);
        const fileSaverService = injector.get(FileSaverService);
        const coreTableComponent = config.tableId
            ? injector.get(TableLocatorService).findById(config.tableId)
            : injector.get(CoreTableComponent);
        const tableDataConfiguratorService = coreTableComponent.injector.get(TableDataConfiguratorService);

        if (!coreTableComponent) {
            throw new Error(`TableDataExportActionHandlerService: Could not find table!`);
        }

        combineLatest([coreTableComponent.columns$, coreTableComponent.data$, tableDataConfiguratorService.config$])
            .pipe(
                map(([columns, tableData, filter]) => {
                    this.tableData = {
                        tableConfig: {
                            columns: columns,
                            data: tableData.data,
                        },
                        tableSettings: filter,
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    };
                }),
                shareReplay({ bufferSize: 1, refCount: true }),
            )
            .subscribe();

        config.url = contextService.interpolate(config.url, context as AnyContext);

        const request$ = this.http
            .request(config.method || 'POST', config.url, {
                body: this.tableData,
                responseType: 'blob',
                observe: 'response',
            })
            .pipe(shareReplay({ bufferSize: 1, refCount: true }));

        request$.subscribe((response) => {
            const fileName =
                response.headers.get('content-disposition')?.split('filename=')[1].slice(1, -1) || this.defaultFileName;
            const contentType = response.headers.get('content-type')?.split(';')[0] || this.defaultContentType;

            return fileSaverService.fileSaver(
                new Blob([response.body], { type: contentType }),
                config.fileName || fileName,
            );
        });

        return request$;
    }
}
