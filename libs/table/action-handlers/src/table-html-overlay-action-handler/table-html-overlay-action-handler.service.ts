import { Injectable, Injector } from '@angular/core';
import {
  TableHtmlOverlayAction,
  TableHtmlOverlayOptions,
  TableHtmlOverlayDrawerRefData,
} from './types';
import { Observable, merge, ReplaySubject, of } from 'rxjs';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableHtmlOverlayActionHandlerComponent } from './table-html-overlay-action-handler.component';
import { skip, take } from 'rxjs/operators';
import { TableActionHandler, TableActionTriggeredEvent } from '@spryker/table';

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

  constructor(
    private drawerService: DrawerService,
    private injetor: Injector,
  ) {}

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
