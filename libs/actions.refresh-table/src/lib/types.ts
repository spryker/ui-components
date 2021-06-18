import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    refresh_table: RefreshTableActionConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface RefreshTableActionConfig extends ActionConfig {}
