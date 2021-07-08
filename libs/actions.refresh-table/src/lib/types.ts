import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    'refresh-table': RefreshTableActionConfig;
  }
}

// tslint:disable-next-line: no-empty-interface
export interface RefreshTableActionConfig extends ActionConfig {}
