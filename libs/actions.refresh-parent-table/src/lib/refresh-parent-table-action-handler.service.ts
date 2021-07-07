import { Injectable, Injector } from '@angular/core';
import { ActionHandler } from '@spryker/actions';
import { RefreshParentTableActionConfig } from './types';
import { Observable, of } from 'rxjs';
import {
  CoreTableComponent,
  TableDataConfiguratorService,
} from '@spryker/table';

@Injectable({
  providedIn: 'root',
})
export class RefreshParentTableActionHandlerService
  implements ActionHandler<unknown, void> {
  handleAction(
    injector: Injector,
    config: RefreshParentTableActionConfig,
    context: unknown,
  ): Observable<void> {
    const table = injector.get(CoreTableComponent).parentTable;

    if (!table) {
      throw new Error(
        `RefreshParentTableActionHandlerService: Parent Table is not found!`,
      );
    }

    table.injector.get(TableDataConfiguratorService).update({});

    return of(void 0);
  }
}
