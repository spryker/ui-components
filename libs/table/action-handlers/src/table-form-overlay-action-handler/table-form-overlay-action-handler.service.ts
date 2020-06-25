import { Injectable, Injector } from '@angular/core';
import { TableFormOverlayAction, TableFormOverlayOptions } from './types';
import { Observable, merge, ReplaySubject } from 'rxjs';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { skip, take } from 'rxjs/operators';
import {
  TableActionHandler,
  TableActionTriggeredEvent,
  TableColumnContext,
} from '@spryker/table';
import { ContextService } from '@spryker/utils';

/**
 * Handles Form Overlay action triggered from the {@link TableComponent}
 * by opening {@link TableFormOverlayActionHandlerComponent} in the drawer.
 */
@Injectable({
  providedIn: 'root',
})
export class TableFormOverlayActionHandlerService
  implements TableActionHandler<TableFormOverlayAction> {
  drawerData$ = new ReplaySubject<TableFormOverlayOptions>(1);
  drawerRef?: DrawerRef;

  constructor(
    private drawerService: DrawerService,
    private contextService: ContextService,
  ) {}

  /**
   * Opens the drawer with the ajax form component in it
   * and also reuse that opened drawer for next action triggers
   */
  handleAction(
    actionEvent: TableActionTriggeredEvent<TableFormOverlayAction>,
    injector: Injector,
  ): Observable<unknown> {
    const actionEventItem = actionEvent.items[0];
    const drawerData = { ...actionEvent.action.typeOptions };
    const dataContext = {
      row: actionEventItem,
      i: 0,
    } as TableColumnContext;

    drawerData.url = this.contextService.interpolate(
      drawerData.url,
      dataContext as any,
    );
    this.drawerData$.next(drawerData);

    if (!this.drawerRef) {
      this.drawerRef = this.drawerService.openComponent(
        TableFormOverlayActionHandlerComponent,
        { data: this.drawerData$, injector },
      );

      this.drawerRef.afterClosed().subscribe({
        next: () => (this.drawerRef = undefined),
      });
    }

    return merge(
      this.drawerRef.afterClosed(),
      this.drawerData$.pipe(skip(1), take(1)),
    );
  }
}
