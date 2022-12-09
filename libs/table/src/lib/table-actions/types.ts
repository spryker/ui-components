import { Injector } from '@angular/core';
import { ActionConfig } from '@spryker/actions';
import { Observable } from 'rxjs';

import { TableDataRow } from '../table/table';

export interface TableActionBase extends ActionConfig {
    id: string;
}

export interface TableActionTriggeredEvent<A extends TableActionBase = TableActionBase> {
    action: A;
    items: TableDataRow[];
}

export interface TableActionHandler<A extends TableActionBase = TableActionBase> {
    handleAction(actionEvent: TableActionTriggeredEvent<A>, injector: Injector): Observable<unknown>;
}
