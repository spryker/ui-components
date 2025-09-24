import { ActionConfig } from '@spryker/actions';
import { ConfirmModalStrategyOptions } from '@spryker/modal';

export interface ConfirmationActionConfig extends ActionConfig {
    action: ActionConfig;
    modal?: ConfirmModalStrategyOptions;
}
