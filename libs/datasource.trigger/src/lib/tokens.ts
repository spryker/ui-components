import { InjectionToken, Provider } from '@angular/core';
import { DatasourceTriggerEventDeclaration } from './types';

// Explicit type annotation: keeps declaration emit referencing the exported alias instead of
// synthesising a deep `types/` subpath import that is absent from the target's `exports` map.
export const DatasourceEventTypesToken: InjectionToken<DatasourceTriggerEventDeclaration[]> = new InjectionToken<
    DatasourceTriggerEventDeclaration[]
>('DatasourceEventTypesToken');

export function provideDatasourceEvents(events: DatasourceTriggerEventDeclaration): Provider {
    return {
        provide: DatasourceEventTypesToken,
        useValue: events,
        multi: true,
    };
}
