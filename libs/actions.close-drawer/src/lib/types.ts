import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    close_drawer: CloseDrawerActionConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface CloseDrawerActionConfig extends ActionConfig {}
