import { Injectable, Injector } from '@angular/core';
import { LOCAL_GET_CONTEXT, LocalGetContextToken } from '@orchestrator/core';
import {
  CoreTableComponent,
  TableColumnContext,
  TableData,
  TableDataConfig,
  TableDatasource,
  TableDatasourceConfig,
  TableDatasourceService,
} from '@spryker/table';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';

import { TableEditableFeatureComponent } from './table-editable-feature.component';

export interface TableDependableDatasourceConfig extends TableDatasourceConfig {
  /** ID of the dependent column */
  dependsOn: string;
  datasource: TableDatasourceConfig;
}

@Injectable({ providedIn: 'root' })
export class TableDependableDatasourceService
  implements TableDatasource<TableDependableDatasourceConfig> {
  resolve(
    datasource: TableDependableDatasourceConfig,
    dataConfig$: Observable<TableDataConfig>,
    injector: Injector,
  ): Observable<TableData> {
    const datasourceService = injector.get(TableDatasourceService);
    const tableComponent = injector.get(CoreTableComponent);

    const getContext = injector.get<LocalGetContextToken>(LOCAL_GET_CONTEXT);
    const editableService$ = tableComponent
      .findFeatureByType(TableEditableFeatureComponent)
      .pipe(map((editableFeature) => editableFeature.tableEditableService));

    const context: TableColumnContext = getContext();

    return editableService$.pipe(
      switchMap((editableService) =>
        editableService
          ? editableService
              .getUpdatesFor(datasource.dependsOn, context.i)
              .pipe(
                startWith(
                  editableService.getValueFor(datasource.dependsOn, context.i),
                ),
              )
          : EMPTY,
      ),
      switchMap((value) => datasourceService.resolve(datasource.datasource)),
      tap((data) =>
        console.log('From datasourse', datasource.datasource, data),
      ),
    );
  }
}
