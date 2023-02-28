import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TableFeatureComponent, TableFeatureLocation } from '@spryker/table';
import { ButtonSize, ButtonVariant } from '@spryker/button';
import { mapTo, pluck, shareReplay, switchMap, take } from 'rxjs/operators';
import { TableDataExportConfig } from './types';

@Component({
    selector: 'spy-table-data-export-feature',
    templateUrl: './table-data-export-feature.component.html',
    styleUrls: ['./table-data-export-feature.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TableFeatureComponent,
            useExisting: TableDataExportFeatureComponent,
        },
    ],
})
export class TableDataExportFeatureComponent extends TableFeatureComponent<TableDataExportConfig> {
    name = 'dataExport';
    tableFeatureLocation = TableFeatureLocation;
    actionSize = ButtonSize.Small;
    actionVariant = ButtonVariant.Outline;

    action$ = this.config$.pipe(pluck('action'));
    actionTitle$ = this.config$.pipe(pluck('actionTitle'));

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    isDataResolved$ = this.tableData$.pipe(mapTo(true), take(1));
}
