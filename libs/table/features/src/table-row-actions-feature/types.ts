/* tslint:disable:no-empty-interface */
export interface TableRowActionBase {
  id: TableRowAction;
  title: string;
}

export interface TableRowActionRegistry {
  // Key is action string - value is action options type
}

export type TableRowAction = keyof TableRowActionRegistry;
