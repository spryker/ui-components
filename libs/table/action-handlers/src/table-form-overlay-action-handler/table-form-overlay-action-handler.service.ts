import { Injectable } from '@angular/core';
import { TableFormOverlayAction, TableFormOverlayOptions } from './types';
import { Observable, merge, ReplaySubject } from 'rxjs';
import { DrawerRef, DrawerService } from '@spryker/drawer';
import { TableFormOverlayActionHandlerComponent } from '.';
import { skip, take } from 'rxjs/operators';
import { TableActionHandler, TableActionTriggeredEvent } from '../../../src/lib/types';

@Injectable({
  providedIn: 'root',
})
export class TableFormOverlayActionHandlerService
  implements TableActionHandler<TableFormOverlayAction> {
  drawerData$ = new ReplaySubject<TableFormOverlayOptions>(1);
  drawerRef?: DrawerRef;

  constructor(private drawerService: DrawerService) {}

  handleAction(
    actionEvent: TableActionTriggeredEvent<TableFormOverlayAction>,
  ): Observable<unknown> {
    this.drawerData$.next(actionEvent.action.typeOptions);

    if (!this.drawerRef) {
      this.drawerRef = this.drawerService.openComponent(
        TableFormOverlayActionHandlerComponent,
        { data: this.drawerData$ },
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
