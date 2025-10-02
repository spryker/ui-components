import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Injectable, inject } from '@angular/core';
import { TableColumnTypeComponent, TableColumnComponent, TableColumnContext } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnChipConfig {
    protected contextService = inject(ContextService);

    text? = this.contextService.wrap('displayValue');
    color?: string;
    maxWidth?: string = '145px';
}

@Component({
    standalone: false,
    selector: 'spy-table-column-chip',
    templateUrl: './table-column-chip.component.html',
    styleUrls: ['./table-column-chip.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnChipConfig)
export class TableColumnChipComponent implements TableColumnComponent<TableColumnChipConfig> {
    @Input() config?: TableColumnChipConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;
}
