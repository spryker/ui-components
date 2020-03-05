import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { TableRowActionsDeclaration, TableActionTriggeredEvent } from './table';

export const TABLE_ROW_ACTIONS_TOKEN = new InjectionToken<
  TableRowActionsDeclaration[]
>('TABLE_ROW_ACTIONS_TOKEN');

@Injectable()
export class TableActionService {
  private actionHandlersObject: TableRowActionsDeclaration = {};

  constructor(
    @Optional()
    @Inject(TABLE_ROW_ACTIONS_TOKEN)
    private actionHandlers: TableRowActionsDeclaration[],
  ) {
    this.actionHandlerTransformer();
  }

  private actionHandlerTransformer() {
    this.actionHandlersObject = this.actionHandlers?.reduce(
      (actions, action) => ({ ...actions, ...action }),
      {},
    );
  }

  handle(actionEvent: TableActionTriggeredEvent): boolean {
    const actionHandler = this.actionHandlersObject?.[actionEvent.action.id];
    if (actionHandler) {
      actionHandler.handleAction(actionEvent);

      return true;
    }

    return false;
  }
}
