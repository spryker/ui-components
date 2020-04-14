import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableDataConfiguratorService,
  TableFeatureLocation,
} from '@spryker/table';
import { UrlPersistenceStrategy } from '@spryker/utils';
import { tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'spy-table-sync-state-feature',
  templateUrl: './table-sync-state-feature.component.html',
  styleUrls: ['./table-sync-state-feature.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: TableFeatureComponent,
      useExisting: TableSyncStateFeatureComponent,
    },
  ],
})
export class TableSyncStateFeatureComponent extends TableFeatureComponent {
  @Input() location = TableFeatureLocation.hidden;
  key = 'table-state';
  stateToConfig$?: Observable<unknown>;
  configToState$?: Observable<Record<string, unknown>>;
  state$?: Observable<unknown>;

  constructor(
    private urlPersistenceStrategy: UrlPersistenceStrategy,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
    super.setDataConfiguratorService(service);

    this.configToState$ = service.config$.pipe(
      tap(config => {
        return this.urlPersistenceStrategy.save(this.key, config);
      }),
    );

    this.stateToConfig$ = this.urlPersistenceStrategy
      .retrieve(this.key)
      .pipe(tap(state => service.reset(state as Record<string, unknown>)));

    this.state$ = merge(this.stateToConfig$, this.configToState$);

    this.cdr.detectChanges();
  }
}
