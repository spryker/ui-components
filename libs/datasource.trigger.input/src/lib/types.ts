import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface InputDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type InputDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
