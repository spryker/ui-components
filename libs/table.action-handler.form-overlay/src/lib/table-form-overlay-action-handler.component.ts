import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DrawerRef } from '@spryker/drawer';
import { TableFormOverlayOptions } from './types';

@Component({
  selector: 'spy-table-form-overlay-action-handler',
  templateUrl: './table-form-overlay-action-handler.component.html',
  styleUrls: ['./table-form-overlay-action-handler.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'spy-table-form-overlay-action-handler',
  },
})
export class TableFormOverlayActionHandlerComponent {
  data$ = this.drawerRef.data$;

  constructor(private drawerRef: DrawerRef<TableFormOverlayOptions>) {}
}
