import { Injectable, Injector } from '@angular/core';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  drawerRef$ = new ReplaySubject<DrawerRef>();

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

    if (this.drawerRef) {
      this.drawerRef$.next(this.drawerRef);
      this.drawerRef.close().subscribe(() => {
        const drawerRef = this.drawerService.openComponent(
          TableFormOverlayActionHandlerComponent,
          {
            data: this.drawerData$,
            injector,
          },
        );
        this.drawerRef = drawerRef;
        this.drawerRef$.next(drawerRef);

        this.drawerRef
          .afterClosed()
          .subscribe(() => (this.drawerRef = undefined));
      });
    }

    if (!this.drawerRef) {
      this.drawerRef = this.drawerService.openComponent(
        TableFormOverlayActionHandlerComponent,
        {
          data: this.drawerData$,
          injector,
        },
      );
      this.drawerRef$.next(this.drawerRef);
      this.drawerRef
        .afterClosed()
        .subscribe(() => (this.drawerRef = undefined));
    }

    return this.drawerRef$.pipe(
      switchMap(drawerRef => drawerRef.afterClosed()),
    );
  }
}
