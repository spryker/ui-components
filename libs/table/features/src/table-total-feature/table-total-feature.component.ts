import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { map, mapTo, shareReplay, switchMap, take } from 'rxjs/operators';

declare module '@spryker/table' {
  // tslint:disable-next-line: no-empty-interface
  interface TableConfig extends TableTotalConfig {}
}

export interface TableTotalConfig {
  total?: {
    enabled: boolean;
  };
}

@Component({
  selector: 'spy-table-total-feature',
  templateUrl: './table-total-feature.component.html',
  styleUrls: ['./table-total-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableTotalFeatureComponent,
    },
  ],
})
export class TableTotalFeatureComponent extends TableFeatureComponent {
  name = 'total';
  tableFeatureLocation = TableFeatureLocation;

  tableData$ = this.table$.pipe(
    switchMap(table => table.data$),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));

  total$ = this.tableData$.pipe(map(data => data.total));

  selected$ = this.tableEventBus$.pipe(
    switchMap(eventBus => eventBus.on<any[]>('itemSelection')),
    map(items => items.length),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
}
