import { Injectable, Injector } from '@angular/core';
import { LOCAL_GET_CONTEXT, LocalGetContextToken } from '@orchestrator/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import {
  CoreTableComponent,
  TableColumnContext,
  TableData,
} from '@spryker/table';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { TableEditableFeatureComponent } from './table-editable-feature.component';
import { TableDatasourceDependableConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceDependableService implements Datasource<TableData> {
  resolve(
    injector: Injector,
    config: TableDatasourceDependableConfig,
    context?: unknown,
  ): Observable<TableData> {
    const datasourceService = injector.get(DatasourceService);
    const tableComponent = injector.get(CoreTableComponent);
    const getLocalContext = injector.get<LocalGetContextToken>(
      LOCAL_GET_CONTEXT,
    );
    const localContext: TableColumnContext = getLocalContext();
    const editableService$ = tableComponent
      .findFeatureByType(TableEditableFeatureComponent)
      .pipe(map((editableFeature) => editableFeature.tableEditableService));

    return editableService$.pipe(
      switchMap((editableService) =>
        editableService
          ? editableService
              .getUpdatesFor(config.dependsOn, localContext.i)
              .pipe(
                startWith(
                  editableService.getValueFor(config.dependsOn, localContext.i),
                ),
              )
          : EMPTY,
      ),
      switchMap((value) => {
        const contextKey = config.contextKey ?? config.dependsOn;
        const tableColumnContext = {
          ...(context as object),
          [contextKey]: value,
        };

        return datasourceService.resolve<TableData>(
          injector,
          config.datasource,
          tableColumnContext,
        );
      }),
      tap((data) => console.log('From datasourse', config.datasource, data)),
    );
  }
}
