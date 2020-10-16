import { Injectable, Injector, OnDestroy } from '@angular/core';
import { DrawerRef, DrawerRouterService } from '@spryker/drawer';
import {
  CoreTableComponent,
  TableActionHandler,
  TableActionTriggeredEvent,
} from '@spryker/table';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { mapTo, shareReplay, skip, switchMap, take } from 'rxjs/operators';
import { TableFormOverlayActionHandlerComponent } from './table-form-overlay-action-handler.component';
import { TableFormOverlayAction } from './types';

/**
 * Handles Form Overlay action triggered from the {@link TableComponent}
 * by opening {@link TableFormOverlayActionHandlerComponent} in the drawer.
 */
@Injectable({ providedIn: 'root' })
export class TableFormOverlayActionHandlerService
  implements TableActionHandler<TableFormOverlayAction>, OnDestroy {
  private activeOutletsMap = new Map<Injector, Subscription>();
  private outletHandledMap = new Map<
    Injector,
    Observable<DrawerRef | undefined>
  >();

  constructor(private drawerRouterService: DrawerRouterService) {}

  ngOnDestroy(): void {
    this.activeOutletsMap.forEach(sub => sub.unsubscribe());
    this.activeOutletsMap.clear();
    this.outletHandledMap.clear();
  }

  tableInit(injector: Injector) {
    const tableComponent = injector.get(CoreTableComponent);

    const outlet$ = tableComponent.tableId$.pipe(
      switchMap(tableId =>
        this.drawerRouterService.outlet(
          {
            id: this.getDrawerId(tableId),
            componentType: TableFormOverlayActionHandlerComponent,
          },
          { injector },
        ),
      ),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    // Activate Drawer Outlet
    this.activeOutletsMap.set(injector, outlet$.subscribe());

    this.outletHandledMap.set(injector, outlet$);
  }

  tableDispose(injector: Injector) {
    // Deactivate Drawer Outlet
    this.activeOutletsMap.get(injector)?.unsubscribe();
    this.activeOutletsMap.delete(injector);
    this.outletHandledMap.delete(injector);
  }

  /**
   * Opens the drawer with the ajax form component in it
   * and also reuse that opened drawer for next action triggers
   */
  handleAction(
    actionEvent: TableActionTriggeredEvent<TableFormOverlayAction>,
    injector: Injector,
  ): Observable<void> {
    const tableComponent = injector.get(CoreTableComponent);
    const data = { ...actionEvent.action.typeOptions };

    tableComponent.tableId$
      .pipe(take(1))
      .subscribe(tableId =>
        this.drawerRouterService.open(this.getDrawerId(tableId), { data }),
      );

    const drawerRef$ = this.outletHandledMap.get(injector) ?? EMPTY;

    return merge(
      drawerRef$.pipe(skip(1)),
      drawerRef$.pipe(
        switchMap(drawerRef => drawerRef?.data$.pipe(skip(1)) ?? EMPTY),
      ),
    ).pipe(take(1), mapTo(undefined));
  }

  private getDrawerId(tableId: string): string {
    return `table-${tableId}:form-overlay`;
  }
}
