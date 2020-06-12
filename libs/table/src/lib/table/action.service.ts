import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { TableRowActionsDeclaration } from './table';
import { TableActionTriggeredEvent } from '../types';

export const TABLE_ROW_ACTIONS_TOKEN = new InjectionToken<
  TableRowActionsDeclaration[]
>('TABLE_ROW_ACTIONS_TOKEN');

@Injectable()
export class TableActionService {
  private actionHandlersObject?: TableRowActionsDeclaration = this.actionHandlers?.reduce(
    (actions, action) => ({ ...actions, ...action }),
    {},
  );

  constructor(
    @Optional()
    @Inject(TABLE_ROW_ACTIONS_TOKEN)
    private actionHandlers?: TableRowActionsDeclaration[],
  ) {}

  handle(actionEvent: TableActionTriggeredEvent): boolean {
    const actionHandler = this.actionHandlersObject?.[actionEvent.action.id];

    if (actionHandler) {
      actionHandler.handleAction(actionEvent);

      return true;
    }

    return false;
  }
}
