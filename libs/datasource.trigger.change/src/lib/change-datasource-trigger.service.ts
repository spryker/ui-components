import { Injectable } from '@angular/core';
import { DatasourceTriggerEvent } from '@spryker/datasource.trigger';
import { EMPTY, fromEvent, Observable, of, switchMap } from 'rxjs';
import { ChangeDatasourceTriggerConfig, ChangeDatasourceTriggerHTMLElement } from './types';

@Injectable({
    providedIn: 'root',
})
export class ChangeDatasourceTriggerService implements DatasourceTriggerEvent {
    readonly minCharacters = 2;

    subscribeToEvent(
        config: ChangeDatasourceTriggerConfig,
        triggerElement: ChangeDatasourceTriggerHTMLElement,
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
