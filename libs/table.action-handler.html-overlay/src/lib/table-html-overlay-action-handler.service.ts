import { Injectable, Injector } from '@angular/core';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { TableHtmlOverlayActionHandlerComponent } from './table-html-overlay-action-handler.component';
import { TableHtmlOverlayAction, TableHtmlOverlayOptions } from './types';

/**
 * Handles Html Overlay action triggered from the {@link TableComponent}
 * by opening {@link TableHtmlOverlayActionHandlerComponent} in the drawer.
 */
@Injectable({
  providedIn: 'root',
})
export class TableHtmlOverlayActionHandlerService
  implements TableActionHandler<TableHtmlOverlayAction> {
  drawerData$ = new ReplaySubject<TableHtmlOverlayOptions>(1);
  drawerRef?: DrawerRef;

  constructor(private drawerService: DrawerService) {}

  /**
   * Opens the drawer with the {@link TableHtmlOverlayActionHandlerComponent} in it
   * and also reuse that opened drawer for next action triggers
   */
  handleAction(
    actionEvent: TableActionTriggeredEvent<TableHtmlOverlayAction>,
    injector: Injector,
  ): Observable<unknown> {
    const drawerData = { ...actionEvent.action.typeOptions };
    this.drawerData$.next(drawerData);

    if (!this.drawerRef) {
      this.drawerRef = this.drawerService.openComponent(
        TableHtmlOverlayActionHandlerComponent,
        {
          data: this.drawerData$,
          injector,
        },
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
