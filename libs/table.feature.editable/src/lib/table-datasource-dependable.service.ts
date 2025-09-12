import { Injectable, Injector, inject } from '@angular/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import { CoreTableComponent, TableColumnService, TableData } from '@spryker/table';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { TableEditableFeatureComponent } from './table-editable-feature.component';
import { TableDatasourceDependableConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceDependableService implements Datasource<TableData> {
    private tableColumnService = inject(TableColumnService);

    resolve(injector: Injector, config: TableDatasourceDependableConfig, context?: unknown): Observable<TableData> {
        const isCreateMode = typeof context === 'object' ? (context as any)?.isCreateMode || false : false;
        const datasourceService = injector.get(DatasourceService);
        const tableComponent = injector.get(CoreTableComponent);
        const localContext = this.tableColumnService.getContext(injector);
        const editableFeatureComponent$ = tableComponent.findFeatureByType(TableEditableFeatureComponent);
        const editableService$ = editableFeatureComponent$.pipe(
            map((editableFeature) => editableFeature.tableEditableService),
        );

        return combineLatest([editableService$, editableFeatureComponent$]).pipe(
            switchMap(([editableService, editableFeatureComponent]) => {
                if (!editableService) {
                    return EMPTY;
                }

                const index = isCreateMode ? editableFeatureComponent.getShiftedIndex(localContext.i) : localContext.i;

                return editableService
                    .getUpdatesFor(config.dependsOn, index)
                    .pipe(startWith(editableService.getValueFor(config.dependsOn, index)));
            }),
            switchMap((value) => {
                const contextKey = config.contextKey ?? config.dependsOn;
                const tableColumnContext = {
                    ...(context as object),
                    [contextKey]: value,
                };

                delete tableColumnContext.isCreateMode;

                return datasourceService.resolve<TableData>(injector, config.datasource, tableColumnContext);
            }),
        );
    }
}
