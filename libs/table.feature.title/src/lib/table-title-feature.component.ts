import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { mapTo, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

import { TableTitleConfig } from './types';

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
export class TableTitleFeatureComponent extends TableFeatureComponent<TableTitleConfig> {
    name = 'title';
    tableFeatureLocation = TableFeatureLocation;

    title$ = this.config$.pipe(pluck('title'));

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));
}
