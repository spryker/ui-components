import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Injectable } from '@angular/core';
import { ColumnTypeOption, TableColumnTypeComponent, TableColumnComponent, TableColumnContext } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnDateConfig {
    @ColumnTypeOption()
    date? = this.contextService.wrap('displayValue');
    @ColumnTypeOption()
    format? = 'shortDate';

    constructor(private contextService: ContextService) {}
}

@Component({
    selector: 'spy-table-column-date',
    templateUrl: './table-column-date.component.html',
    styleUrls: ['./table-column-date.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnDateConfig)
export class TableColumnDateComponent implements TableColumnComponent<TableColumnDateConfig> {
    @Input() config?: TableColumnDateConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;
}
