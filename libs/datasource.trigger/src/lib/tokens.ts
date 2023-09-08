import { InjectionToken, Provider } from '@angular/core';
import { DatasourceTriggerEventDeclaration } from './types';

export const DatasourceEventTypesToken = new InjectionToken<DatasourceTriggerEventDeclaration[]>(
    'DatasourceEventTypesToken',
);

export function provideDatasourceEvents(events: DatasourceTriggerEventDeclaration): Provider {
    return {
        provide: DatasourceEventTypesToken,
        useValue: events,
        multi: true,
    };
}
