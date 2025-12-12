import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, Injectable, inject } from '@angular/core';
import { TableColumnComponent, TableColumnContext, TableColumnTypeComponent } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnTextConfig {
    protected contextService = inject(ContextService);

    text? = this.contextService.wrap('displayValue');
}

@Component({
    standalone: false,
    selector: 'spy-table-column-text',
    templateUrl: './table-column-text.component.html',
    styleUrls: ['./table-column-text.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
@TableColumnTypeComponent(TableColumnTextConfig)
export class TableColumnTextComponent implements TableColumnComponent<TableColumnTextConfig> {
    @Input() config?: TableColumnTextConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;
}
