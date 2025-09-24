import { Injectable } from '@angular/core';
import { DatasourceTriggerEvent } from '@spryker/datasource.trigger';
import { EMPTY, fromEvent, Observable, of, switchMap } from 'rxjs';
import { InputDatasourceTriggerConfig, InputDatasourceTriggerHTMLElement } from './types';

@Injectable({
    providedIn: 'root',
})
export class InputDatasourceTriggerService implements DatasourceTriggerEvent {
    readonly minCharacters = 2;

    subscribeToEvent(
        config: InputDatasourceTriggerConfig,
        triggerElement: InputDatasourceTriggerHTMLElement,
    ): Observable<Record<string, unknown>> {
        return fromEvent(triggerElement, config.event).pipe(
            switchMap(() => {
                const value = triggerElement.value;
                const isValid = value.length >= (config.minCharacters ?? this.minCharacters);

                return isValid ? of({ value: value }) : EMPTY;
            }),
        );
    }
}
