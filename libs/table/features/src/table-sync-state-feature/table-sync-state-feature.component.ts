import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import {
  TableFeatureComponent,
  TableDataConfiguratorService,
  TableFeatureLocation,
  DefaultInitialDataStrategy,
  TableDataConfig, TableFeatureConfig,
} from '@spryker/table';
import { UrlPersistenceStrategy } from '@spryker/utils';
import { tap, take, switchMap } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';

declare module '@spryker/table' {
  interface TableConfig {
    syncStateUrl?: TableSyncStateConfig
  }
}

// tslint:disable-next-line: no-empty-interface
export interface TableSyncStateConfig extends TableFeatureConfig {}

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
export class TableSyncStateFeatureComponent extends TableFeatureComponent<TableSyncStateConfig> {
  name = 'syncStateUrl';
  tableFeatureLocation = TableFeatureLocation;

  key = 'table-state';
  stateToConfig$?: Observable<unknown>;
  configToState$?: Observable<Record<string, unknown>>;
  state$?: Observable<unknown>;

  constructor(
    private urlPersistenceStrategy: UrlPersistenceStrategy,
    private cdr: ChangeDetectorRef,
    injector: Injector,
  ) {
    super(injector);
  }

  setDataConfiguratorService(service: TableDataConfiguratorService): void {
    super.setDataConfiguratorService(service);

    const urlState$ = this.urlPersistenceStrategy.retrieve(
      this.key,
    ) as Observable<Record<string, unknown>>;

    const syncStateInitialData = new SyncStateInitialDataStrategy(urlState$);

    service.provideInitialDataStrategy(syncStateInitialData);

    this.configToState$ = service.config$.pipe(
      tap(config => this.urlPersistenceStrategy.save(this.key, config)),
    );

    this.stateToConfig$ = urlState$.pipe(tap(state => service.reset(state)));

    this.state$ = merge(this.stateToConfig$, this.configToState$);

    this.cdr.detectChanges();
  }
}

class SyncStateInitialDataStrategy extends DefaultInitialDataStrategy {
  constructor(private urlState$: Observable<Record<string, unknown>>) {
    super();
  }

  getData(): Observable<TableDataConfig> {
    return this.urlState$.pipe(
      take(1),
      switchMap(url => (url ? of(url) : super.getData())),
    );
  }
}
