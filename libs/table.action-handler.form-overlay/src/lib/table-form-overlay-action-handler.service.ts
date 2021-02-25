import { Injectable, Injector } from '@angular/core';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import {
  CoreTableComponent,
  TableActionHandler,
  TableActionTriggeredEvent,
} from '@spryker/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
  private drawerRefs = new Map<
    CoreTableComponent,
    BehaviorSubject<DrawerRef>
  >();

  constructor(private drawerService: DrawerService) {}

  private openDrawer(
    injector: Injector,
    data: Observable<TableFormOverlayOptions>,
    table: CoreTableComponent,
  ): void {
    const drawerRef = this.drawerService.openComponent(
      TableFormOverlayActionHandlerComponent,
      {
        data,
        injector,
      },
    );

    this.drawerRefs.set(table, new BehaviorSubject(drawerRef as DrawerRef));
    drawerRef.afterClosed().subscribe(() => this.drawerRefs.delete(table));
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
    const table = injector.get(CoreTableComponent);
    const isDrawerRefExist = this.drawerRefs.has(table);

    if (isDrawerRefExist) {
      // tslint:disable-next-line: no-non-null-assertion
      const drawerRef$ = this.drawerRefs.get(table)!;
      const drawerRef = drawerRef$.getValue();

      drawerRef$.next(drawerRef);
      drawerRef
        .close()
        .subscribe(() => this.openDrawer(injector, drawerData, table));
    }

    if (!isDrawerRefExist) {
      this.openDrawer(injector, drawerData, table);
    }

    // tslint:disable-next-line: no-non-null-assertion
    return this.drawerRefs
      .get(table)!
      .pipe(switchMap((drawerRef) => drawerRef.afterClosed()));
  }
}
