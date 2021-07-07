import { ActionConfig } from '@spryker/actions';

declare module '@spryker/actions' {
  interface ActionsRegistry {
    http: HttpActionConfig;
  }
}

export interface HttpActionConfig extends ActionConfig {
  url: string;
  method?: string;
}

export interface HttpActionResponse {
  actions?: ActionConfig[];
}
