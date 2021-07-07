import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    redirect: RedirectActionConfig;
  }
}

export interface RedirectActionConfig extends ActionConfig {
  url: string;
}
