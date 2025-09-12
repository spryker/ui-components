import { Injectable, Injector, inject } from '@angular/core';
import { Datasource, DatasourceService } from '@spryker/datasource';
import { InjectionTokenType } from '@spryker/utils';
import { debounceTime, EMPTY, Observable, switchMap } from 'rxjs';
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
    private datasourceService = inject(DatasourceService);
    private eventsTypes = inject<InjectionTokenType<typeof DatasourceEventTypesToken>>(DatasourceEventTypesToken, {
        optional: true,
    });

    readonly debounce = 300;

    private events: Partial<DatasourceTriggerEventDeclaration> =
        this.eventsTypes?.reduce((events, event) => ({ ...events, ...event }), {}) ?? {};

    resolve(injector: Injector, config: DatasourceTriggerConfig, context?: unknown): Observable<unknown> {
        const triggerElement$ = injector.get(DatasourceTriggerElement).getTriggerElement();

        if (!this.isEventTypeRegistered(config.event)) {
            throw Error(`DatasourceTriggerService: Unknown event type ${config.event}`);
        }

        const eventService: DatasourceTriggerEvent = injector.get(this.events[config.event]);

        return triggerElement$.pipe(
            switchMap((trigger) => (trigger ? eventService.subscribeToEvent(config, trigger) : EMPTY)),
            debounceTime(config.debounce ?? this.debounce),
            switchMap((context) =>
                (context as Record<string, unknown>).value
                    ? this.datasourceService.resolve(injector, config.datasource, context)
                    : EMPTY,
            ),
        );
    }

    private isEventTypeRegistered(
        type: DatasourceTriggerEventRegistryType | string,
    ): type is keyof DatasourceTriggerEventRegistry {
        return type in this.events;
    }
}
