import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DrawerRef } from '@spryker/drawer';
import { TableFormOverlayAction, TableFormOverlayOptions } from './types';
import { Observable } from 'rxjs';

declare module '@spryker/table' {
  interface TableActionRegistry {
    'form-overlay': TableFormOverlayAction;
  }
}

@Component({
  selector: 'spy-table-form-overlay-action-handler',
  templateUrl: './table-form-overlay-action-handler.component.html',
  styleUrls: ['./table-form-overlay-action-handler.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFormOverlayActionHandlerComponent {
  data = this.drawerRef.options.data;

  constructor(
    private drawerRef: DrawerRef<Observable<TableFormOverlayOptions>>,
  ) {}
}
