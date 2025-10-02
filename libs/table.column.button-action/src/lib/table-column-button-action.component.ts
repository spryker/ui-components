import { ChangeDetectionStrategy, Component, Injectable, Input, ViewEncapsulation, inject } from '@angular/core';
import { ActionConfig, ActionType } from '@spryker/actions';
import { ButtonAttributes, ButtonShape, ButtonSize, ButtonVariant } from '@spryker/button';
import { TableColumnComponent, TableColumnContext } from '@spryker/table';
import { ContextService } from '@spryker/utils';

@Injectable({ providedIn: 'root' })
export class TableColumnButtonAction implements ActionConfig {
    type!: ActionType;
    [k: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class TableColumnButtonActionConfig {
    protected contextService = inject(ContextService);

    text? = this.contextService.wrap('displayValue');
    action?: TableColumnButtonAction;
    actionContext?: unknown;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    size?: ButtonSize;
    attrs?: ButtonAttributes;
    icon?: string;
}

@Component({
    standalone: false,
    selector: 'spy-table-column-button-action',
    templateUrl: './table-column-button-action.component.html',
    styleUrls: ['./table-column-button-action.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableColumnButtonActionComponent implements TableColumnComponent<TableColumnButtonActionConfig> {
    @Input() config?: TableColumnButtonActionConfig;
    @Input() context?: TableColumnContext;
    @Input() items?: unknown;
}
