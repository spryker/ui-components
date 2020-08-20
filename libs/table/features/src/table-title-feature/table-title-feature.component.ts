import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { TableFeatureLocation, TableFeatureComponent } from '@spryker/table';
import { TableTitleConfig } from './types';
import {
  pluck,
  map,
  switchMap,
  shareReplay,
  mapTo,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'spy-table-title-feature',
  templateUrl: './table-title-feature.component.html',
  styleUrls: ['./table-title-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableTitleFeatureComponent,
    },
  ],
})
export class TableTitleFeatureComponent extends TableFeatureComponent<
  TableTitleConfig
> {
  name = 'title';
  tableFeatureLocation = TableFeatureLocation;

  title$ = this.config$.pipe(pluck('title'));

  tableData$ = this.table$.pipe(
    switchMap(table => table.data$),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));
}
