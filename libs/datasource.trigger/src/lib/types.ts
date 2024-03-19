import { DatasourceConfig } from '@spryker/datasource';
import { RegistryDeclaration, RegistryType } from '@spryker/utils';
import { Observable } from 'rxjs';

export interface DatasourceTriggerEventRegistry {}

export type DatasourceTriggerEventRegistryType = RegistryType<DatasourceTriggerEventRegistry>;

export type DatasourceTriggerEventDeclaration = RegistryDeclaration<DatasourceTriggerEventRegistry>;

export interface DatasourceTriggerConfig extends DatasourceConfig {
    event: DatasourceTriggerEventRegistryType | string;
    datasource: DatasourceConfig;
    debounce?: number;
}

export interface DatasourceTriggerEvent {
    subscribeToEvent(config, triggerElement): Observable<unknown>;
}

export abstract class DatasourceTriggerElement {
    abstract getTriggerElement(): Observable<HTMLElement>;
}
