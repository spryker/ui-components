import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import { InjectionTokenType } from '@spryker/utils';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { DatasourceEventTypesToken } from './tokens';
import {
    DatasourceTriggerConfig,
    DatasourceTriggerEventDeclaration,
    DatasourceTriggerEventRegistry,
    DatasourceTriggerEventRegistryType,
    DatasourceTriggerEvent,
    DatasourceTriggerElement,
} from './types';

@Injectable({
    providedIn: 'root',
})
export class DatasourceTriggerService implements Datasource {
    readonly debounce = 300;

    private events: Partial<DatasourceTriggerEventDeclaration> =
        this.eventsTypes?.reduce((events, event) => ({ ...events, ...event }), {}) ?? {};

    constructor(
        private datasourceService: DatasourceService,
        @Optional()
        @Inject(DatasourceEventTypesToken)
        private eventsTypes?: InjectionTokenType<typeof DatasourceEventTypesToken>,
    ) {}

    resolve(injector: Injector, config: DatasourceTriggerConfig, context?: unknown): Observable<unknown> {
        const triggerElement$ = injector.get(DatasourceTriggerElement).getTriggerElement();

        config = { ...config };

        if (!('debounce' in config)) {
            config.debounce = this.debounce;
        }

        if (!this.isEventRegisteredType(config.event)) {
            throw Error(`DatasourceTriggerService: Unknown event type ${config.event}`);
        }

        const eventService: DatasourceTriggerEvent = injector.get(this.events[config.event]);

        return triggerElement$.pipe(
            switchMap((trigger) => {
                if (trigger) {
                    return eventService.subscribeToEvent(config, trigger);
                }

                return EMPTY;
            }),
            switchMap((context) => {
                if ((context as any).value) {
                    return this.datasourceService.resolve(injector, config.datasource, context);
                }

                return EMPTY;
            }),
        );
    }

    private isEventRegisteredType(
        type: DatasourceTriggerEventRegistryType | string,
    ): type is keyof DatasourceTriggerEventRegistry {
        return type in this.events;
    }
}
