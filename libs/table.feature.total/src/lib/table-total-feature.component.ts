import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { map, mapTo, shareReplay, switchMap, take, pluck } from 'rxjs/operators';
import { TableTotalConfig } from './types';

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
export class TableTotalFeatureComponent extends TableFeatureComponent<TableTotalConfig> {
    name = 'total';
    tableFeatureLocation = TableFeatureLocation;

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));

    total$ = this.tableData$.pipe(map((data) => data.total.toString()));

    data$ = this.tableData$.pipe(pluck('data'));

    selected$ = this.tableEventBus$.pipe(
        switchMap((eventBus) => eventBus.on<any[]>('itemSelection')),
        map((items) => items.length),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
}
