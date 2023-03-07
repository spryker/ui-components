import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, ViewEncapsulation } from '@angular/core';
import {
    DefaultInitialDataStrategy,
    TableDataConfig,
    TableDataConfiguratorService,
    TableFeatureComponent,
    TableFeatureLocation,
} from '@spryker/table';
import { UrlPersistenceStrategy } from '@spryker/persistence';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { pluck, skip, switchMap, take, tap } from 'rxjs/operators';

import { TableSyncStateConfig } from './types';

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

    tableId$ = this.config$.pipe(
        pluck('tableId'),
        switchMap((tableId) => {
            if (tableId) {
                return of(tableId);
            }

            return this.table$.pipe(switchMap((table) => table.tableId$));
        }),
    );
    stateToConfig$?: Observable<unknown>;
    configToState$?: Observable<any>;
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

        const urlState$ = this.tableId$.pipe(
            switchMap((tableId) => this.urlPersistenceStrategy.retrieve(tableId)),
        ) as Observable<Record<string, unknown>>;

        const syncStateInitialData = new SyncStateInitialDataStrategy(urlState$);

        service.provideInitialDataStrategy(syncStateInitialData);
        service.triggerInitialData();

        this.configToState$ = combineLatest([this.tableId$, service.config$]).pipe(
            tap(([tableId, config]) => this.urlPersistenceStrategy.save(tableId, config)),
        );

        this.stateToConfig$ = urlState$.pipe(
            skip(1),
            tap((state) => service.reset(state as Record<string, unknown>)),
        );

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
            switchMap((url) => (url ? of(url) : super.getData())),
        );
    }
}
