import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { TableFeatureLocation, TableFeatureComponent } from '@spryker/table';
import { TableTitleConfig } from './types';
import { pluck, map } from 'rxjs/operators';

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

  title$ = this.config$.pipe(
    pluck('title'),
    map(title => title ?? ''),
  );
}
