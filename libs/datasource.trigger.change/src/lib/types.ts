import { DatasourceTriggerConfig } from '@spryker/datasource.trigger';

export interface ChangeDatasourceTriggerConfig extends DatasourceTriggerConfig {
    minCharacters?: number;
}

export type ChangeDatasourceTriggerHTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
