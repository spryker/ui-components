import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    refresh_drawer: RefreshDrawerActionConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface RefreshDrawerActionConfig extends ActionConfig {}
