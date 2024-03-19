import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideDatasourceEvents } from './tokens';
import { DatasourceTriggerEventDeclaration } from './types';

@NgModule({
    imports: [CommonModule],
})
export class DatasourceTriggerModule {
    static withEvents(events: DatasourceTriggerEventDeclaration): ModuleWithProviders<DatasourceTriggerModule> {
        return {
            ngModule: DatasourceTriggerModule,
            providers: [provideDatasourceEvents(events)],
        };
    }
}
