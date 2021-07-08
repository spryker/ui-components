import { ActionConfig } from '@spryker/actions';

export interface HttpActionConfig extends ActionConfig {
  url: string;
  method?: string;
}

export interface HttpActionResponse {
  actions?: ActionConfig[];
}
