import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Injectable } from '@angular/core';
import { ColumnTypeOption, TableColumnTypeComponent, TableColumnComponent, TableColumnContext } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnChipConfig {
    @ColumnTypeOption()
    text? = this.contextService.wrap('displayValue');
    @ColumnTypeOption()
    color?: string;
    @ColumnTypeOption()
    maxWidth?: string = '145px';

    constructor(private contextService: ContextService) {}
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
