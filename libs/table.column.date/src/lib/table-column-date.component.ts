import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Injectable, inject } from '@angular/core';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnDateConfig {
    private contextService = inject(ContextService);

    date? = this.contextService.wrap('displayValue');
    format? = 'shortDate';
}

@Component({
    standalone: false,
    selector: 'spy-table-column-date',
    templateUrl: './table-column-date.component.html',
    styleUrls: ['./table-column-date.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableColumnDateComponent implements TableColumnComponent<TableColumnDateConfig> {
    @Input() config?: TableColumnDateConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;
}
