import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { map, shareReplay, switchMap, take } from 'rxjs';

import { TableTitleConfig } from './types';

@Component({
    standalone: false,
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

    title$ = this.config$.pipe(map((config) => config.title));

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    isDataResolved$ = this.tableData$.pipe(
        map(() => true),
        take(1),
    );
}
