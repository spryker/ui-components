import { Injectable, Injector } from '@angular/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import {
  CoreTableComponent,
  TableColumnService,
  TableData,
} from '@spryker/table';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { TableEditableFeatureComponent } from './table-editable-feature.component';
import { TableDatasourceDependableConfig } from './types';

@Injectable({ providedIn: 'root' })
export class TableDatasourceDependableService implements Datasource<TableData> {
  constructor(private tableColumnService: TableColumnService) {}

  resolve(
    injector: Injector,
    config: TableDatasourceDependableConfig,
    context?: unknown,
  ): Observable<TableData> {
    const datasourceService = injector.get(DatasourceService);
    const tableComponent = injector.get(CoreTableComponent);
    const localContext = this.tableColumnService.getContext(injector);
    const editableFeatureComponent$ = tableComponent.findFeatureByType(TableEditableFeatureComponent);
    const editableService$ = editableFeatureComponent$
      .pipe(map((editableFeature) => editableFeature.tableEditableService));

    return combineLatest([editableService$, editableFeatureComponent$]).pipe(
      switchMap(([editableService, editableFeatureComponent]) =>
        editableService
          ? editableService
              .getUpdatesFor(config.dependsOn, editableFeatureComponent.getShiftedIndex(localContext.i))
              .pipe(
                startWith(
                  editableService.getValueFor(config.dependsOn, editableFeatureComponent.getShiftedIndex(localContext.i)),
                ),
              )
          : EMPTY,
      ),
      switchMap((value) => {
        console.log(value, 'value');
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
    );
  }
}
