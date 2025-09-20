import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { map, pluck, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';

import { TablePaginationConfig } from './types';

@Component({
    standalone: false,
    selector: 'spy-table-pagination-feature',
    templateUrl: './table-pagination-feature.component.html',
    styleUrls: ['./table-pagination-feature.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: TableFeatureComponent,
            useExisting: TablePaginationFeatureComponent,
        },
    ],
})
export class TablePaginationFeatureComponent extends TableFeatureComponent<TablePaginationConfig> {
    name = 'pagination';
    tableFeatureLocation = TableFeatureLocation;
    defaultSizes = [10, 20, 50];

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    sizes$ = this.config$.pipe(
        pluck('sizes'),
        map((sizes) => sizes ?? this.defaultSizes),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
    total$ = this.tableData$.pipe(pluck('total'));
    pageSize$ = this.tableData$.pipe(pluck('pageSize')).pipe(
        withLatestFrom(this.sizes$),
        map(([pageSize, sizes]) => pageSize ?? sizes[0]),
    );
    page$ = this.tableData$.pipe(pluck('page'));
    data$ = this.tableData$.pipe(pluck('data'));

    updatePagination(page: number): void {
        this.dataConfiguratorService?.changePage(page);
    }

    updatePageSize(pageSize: number): void {
        this.dataConfiguratorService?.update({ pageSize, page: 1 });
    }
}
