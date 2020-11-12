import { Injectable, Injector } from '@angular/core';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';
import { Observable, ReplaySubject, of } from 'rxjs';
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
  drawerRef?: DrawerRef;
  drawerRef$ = new ReplaySubject<DrawerRef>();

  constructor(private drawerService: DrawerService) {}

  private openDrawer(
    injector: Injector,
    data: Observable<TableFormOverlayOptions>,
  ): void {
    this.drawerRef = this.drawerService.openComponent(
      TableFormOverlayActionHandlerComponent,
      {
        data,
        injector,
      },
    );
    this.drawerRef$.next(this.drawerRef);
    this.drawerRef.afterClosed().subscribe(() => (this.drawerRef = undefined));
  }

  /**
   * Opens the drawer with the ajax form component in it
   * and also reuse that opened drawer for next action triggers
   */
  handleAction(
    actionEvent: TableActionTriggeredEvent<TableFormOverlayAction>,
    injector: Injector,
  ): Observable<unknown> {
    const drawerData = of(actionEvent.action.typeOptions);

    if (this.drawerRef) {
      this.drawerRef$.next(this.drawerRef);
      this.drawerRef
        .close()
        .subscribe(() => this.openDrawer(injector, drawerData));
    }

    if (!this.drawerRef) {
      this.openDrawer(injector, drawerData);
    }

    return this.drawerRef$.pipe(
      switchMap((drawerRef) => drawerRef.afterClosed()),
    );
  }
}
