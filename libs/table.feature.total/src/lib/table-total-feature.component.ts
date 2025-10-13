import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { map, shareReplay, switchMap, take } from 'rxjs';
import { TableTotalConfig } from './types';

@Component({
    standalone: false,
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

    isDataResolved$ = this.tableData$.pipe(
        map(() => true),
        take(1),
    );

    total$ = this.tableData$.pipe(map((data) => data.total));
    data$ = this.tableData$.pipe(map((data) => data.data));

    selected$ = this.tableEventBus$.pipe(
        switchMap((eventBus) => eventBus.on<any[]>('itemSelection')),
        map((items) => items.length),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
}
