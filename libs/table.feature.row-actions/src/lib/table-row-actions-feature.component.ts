import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import { IconActionModule } from '@spryker/icon/icons';
import {
    TableActionBase,
    TableActionsService,
    TableActionTriggeredEvent,
    TableDataRow,
    TableFeatureComponent,
    TableFeatureLocation,
    TableRowClickEvent,
} from '@spryker/table';
import { ContextService } from '@spryker/utils';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { TableRowActionBase, TableRowActionContext, TableRowActionsConfig } from './types';

@Component({
    standalone: false,
    selector: 'spy-table-row-actions-feature',
    templateUrl: './table-row-actions-feature.component.html',
    styleUrls: ['./table-row-actions-feature.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: TableFeatureComponent,
            useExisting: TableRowActionsFeatureComponent,
        },
    ],
})
export class TableRowActionsFeatureComponent
    extends TableFeatureComponent<TableRowActionsConfig>
    implements OnDestroy, OnInit
{
    private tableActionsService = inject(TableActionsService);
    private contextService = inject(ContextService);

    name = 'rowActions';
    tableFeatureLocation = TableFeatureLocation;
    triggerIcon = IconActionModule.icon;
    availableActionsPath?: string;

    actions$ = this.config$.pipe(
        map((config) =>
            (config.actions as TableRowActionBase[]).map(({ id: action, title }) => ({
                action,
                title,
            })),
        ),

        shareReplay({ bufferSize: 1, refCount: true }),
    );

    availableActionsPath$ = this.config$.pipe(pluck('availableActionsPath'));

    private destroyed$ = new Subject<void>();
    private configClick$ = this.config$.pipe(pluck('click'));
    private clickAction$ = this.configClick$.pipe(map((actionId) => this.getActionById(actionId)));
    private rowClicks$ = this.tableEventBus$.pipe(
        withLatestFrom(this.clickAction$),
        switchMap(([tableEventBus, action]) =>
            action ? tableEventBus.on<TableRowClickEvent>('table', 'row-click') : EMPTY,
        ),
    );

    tableData$ = this.table$.pipe(
        switchMap((table) => table.data$),
        pluck('data'),
    );

    constructor() {
        const injector = inject(Injector);

        super(injector);
    }

    ngOnInit(): void {
        this.rowClicks$
            .pipe((o$) => combineLatest([o$, this.clickAction$.pipe(take(1))]), takeUntil(this.destroyed$))
            .subscribe(([{ row }, action]) => {
                const event: TableActionTriggeredEvent = {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    action: action! as TableActionBase,
                    items: [row],
                };

                this.triggerEvent(event);
            });

        this.tableData$.pipe(withLatestFrom(this.configClick$), takeUntil(this.destroyed$)).subscribe(([data, click]) =>
            data.forEach((element, index) =>
                this.table?.updateRowClasses(`${index}`, {
                    'ant-table-row--clickable': Boolean(click),
                }),
            ),
        );
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    private getActionById(actionId?: string): TableRowActionBase | undefined {
        return this.config?.actions?.filter((rowAction) => rowAction.id === actionId)[0];
    }

    actionTriggerHandler(actionId: string, items: TableDataRow[]): void {
        const action = this.getActionById(actionId);

        if (!action) {
            return;
        }

        const event: TableActionTriggeredEvent = {
            action: action as TableActionBase,
            items,
        };

        this.triggerEvent(event);
    }

    triggerEvent(action: TableActionTriggeredEvent): void {
        const rowAction = { ...action };
        const actionItem = rowAction.items[0];
        const actionContext: TableRowActionContext = {
            row: actionItem,
            rowId: this.config?.rowIdPath ? String(actionItem[this.config.rowIdPath]) : '',
        };

        rowAction.action = { ...rowAction.action };

        for (const option in rowAction.action) {
            if (!option) {
                continue;
            }
            const optionItem = rowAction.action[option];
            if (typeof optionItem !== 'string') {
                continue;
            }

            rowAction.action[option] = this.contextService.interpolate(optionItem, actionContext as any);
        }

        this.tableActionsService.trigger(rowAction, actionContext);
    }
}
