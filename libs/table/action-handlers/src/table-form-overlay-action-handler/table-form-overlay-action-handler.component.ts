import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DrawerRef } from '@spryker/drawer';
import { TableFormOverlayOptions } from './types';
import { Observable } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

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
  data$ = this.drawerRef.options.data;
  url$: any;
  url: any;

  constructor(
    private drawerRef: DrawerRef<Observable<TableFormOverlayOptions>>,
  ) {
    this.url$ = this.drawerRef.options.data?.subscribe({
      next: value => console.log(value),
    });
    // console.log(this.url$, this.url);
  }
}
