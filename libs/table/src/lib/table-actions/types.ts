import { Observable } from 'rxjs';
import { Type, Injector } from '@angular/core';
import { TableDataRow } from '../table/table';

// tslint:disable-next-line: no-empty-interface
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
  tableInit?(injector: Injector): void;
  tableDispose?(injector: Injector): void;

  handleAction(
    actionEvent: TableActionTriggeredEvent<A>,
    injector: Injector,
  ): Observable<unknown>;
}
