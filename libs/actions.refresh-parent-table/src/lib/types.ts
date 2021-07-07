import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    refresh_parent_table: RefreshParentTableActionConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface RefreshParentTableActionConfig extends ActionConfig {}
