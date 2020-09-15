import { Injectable, Injector } from '@angular/core';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { TableFormOverlayAction, TableFormOverlayOptions } from './types';

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

  constructor(private drawerService: DrawerService) {}

  /**
   * Opens the drawer with the ajax form component in it
   * and also reuse that opened drawer for next action triggers
   */
  handleAction(
    actionEvent: TableActionTriggeredEvent<TableFormOverlayAction>,
    injector: Injector,
  ): Observable<unknown> {
    this.drawerData$.next(actionEvent.action.typeOptions);

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
