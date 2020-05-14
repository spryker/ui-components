/* tslint:disable:no-empty-interface */
import { TableDataRow } from '@spryker/table';

export interface TableRowActionBase {
  id: string;
  title: string;
  icon?: string;
  type: TableRowAction;
  typeOptions?: unknown;
}

export interface TableActionTriggeredEvent {
  action: TableRowActionBase;
  items: TableDataRow[];
}

export interface TableRowActionRegistry {
  // Key is action string - value is action options type
}

export type TableRowAction = keyof TableRowActionRegistry;

export interface TableRowActionHandler {
  handleAction(actionEvent: TableActionTriggeredEvent): void;
}

export interface TableRowActionsDeclaration {
  [type: string]: TableRowActionHandler;
}
