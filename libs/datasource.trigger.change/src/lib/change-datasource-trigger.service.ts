import { Injectable } from '@angular/core';
import { DatasourceTriggerConfig, DatasourceTriggerEvent } from '@spryker/datasource.trigger';
import { debounceTime, EMPTY, fromEvent, Observable, of, switchMap } from 'rxjs';
import { ChangeDatasourceTriggerHTMLElement } from './types';

@Injectable({
    providedIn: 'root',
})
export class ChangeDatasourceTriggerService implements DatasourceTriggerEvent {
    readonly minCharacters = 2;

    subscribeToEvent(
        config: DatasourceTriggerConfig,
        triggerElement: HTMLElement,
    ): Observable<Record<string, unknown>> {
        return fromEvent(triggerElement, config.event).pipe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            debounceTime(config.debounce!),
            switchMap((event) => {
                const targetValue = (event.target as ChangeDatasourceTriggerHTMLElement).value;
                const isValid = targetValue.length >= (config.minCharacters ?? this.minCharacters);

                return isValid ? of({ value: targetValue }) : EMPTY;
            }),
        );
    }
}
