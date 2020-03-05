import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TableRowActionsDeclaration, TableActionTriggeredEvent } from './table';

export const TABLE_ROW_ACTIONS_TOKEN = new InjectionToken<
  TableRowActionsDeclaration[]
>('TABLE_ROW_ACTIONS_TOKEN');

@Injectable()
export class TableActionService {
  constructor(@Inject(TABLE_ROW_ACTIONS_TOKEN) private actionHandlers: any) {
    this.actionHandlers = this.actionHandlers.reduce(
      (actions: any, action: any) => {
        const key = Object.keys(action) && Object.keys(action)[0];

        if (key) {
          actions[key] = action[key];
        }

        return actions;
      },
      {},
    );
  }

  handle(actionEvent: TableActionTriggeredEvent): boolean {
    return actionEvent.action.id in this.actionHandlers;
  }
}
