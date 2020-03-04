import { Injectable, InjectionToken } from '@angular/core';
import { TableDataRow } from './table';

interface TableRowActionBase {
  id: TableRowAction;
  title: string;
}

interface TableRowActionRegistry {}

type TableRowAction = keyof TableRowActionRegistry;

interface TableRowActionHandler {
  handleAction(actionEvent: TableActionTriggeredEvent): void;
}

interface TableRowActionsDeclaration {
  [type: string]: TableRowActionHandler;
}

type TableRowActionsToken = InjectionToken<TableRowActionsDeclaration[]>;

interface TableActionTriggeredEvent {
  action: TableRowActionBase;
  items: TableDataRow[];
}

interface TableActionsService {
  handle(actionEvent: TableActionTriggeredEvent): boolean;
}

@Injectable()
export class TableActionService {}
