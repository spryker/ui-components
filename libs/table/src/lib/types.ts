// import { TableActionHandler } from './table-actions.service';
import { TableDataRow } from '@spryker/table';
import { Observable } from 'rxjs';
import { Type } from '@angular/core';

export interface TableActionRegistry {
  // link;
}

export interface TableActionsDeclaration {
  [type: string]: Type<TableActionHandler>;
}

export type TableActionType = keyof TableActionRegistry;

export interface TableActionBase {
  id: string;
  type: TableActionType;
  typeOptions?: unknown;
}

export interface TableActionTriggeredEvent<
  A extends TableActionBase = TableActionBase
> {
  action: A;
  items: TableDataRow[];
}

export interface TableActionHandler<
  A extends TableActionBase = TableActionBase
> {
  handleAction(actionEvent: TableActionTriggeredEvent<A>): Observable<unknown>;
}
