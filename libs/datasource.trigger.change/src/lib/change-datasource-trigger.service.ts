import { Injectable } from '@angular/core';
import { DatasourceTriggerConfig, DatasourceTriggerEvent } from '@spryker/datasource.trigger';
import { debounceTime, fromEvent, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChangeDatasourceTriggerService implements DatasourceTriggerEvent {
    readonly minCharacters = 2;

    subscribeToEvent(
        config: DatasourceTriggerConfig,
        triggerElement: HTMLElement,
    ): Observable<Record<string, unknown>> {
        const context: Record<string, unknown> = {};

        config = { ...config };

        if (!('minCharacters' in config)) {
            config.minCharacters = this.minCharacters;
        }

        return fromEvent(triggerElement, config.event).pipe(
            map((event: any) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const isValid = event.target.value.length >= config.minCharacters!;

                context['value'] = isValid ? event.target.value : '';

                return context;
            }),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            debounceTime(config.debounce!),
        );
    }
}
