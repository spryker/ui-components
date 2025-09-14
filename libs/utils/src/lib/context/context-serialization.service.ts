import { Injectable, Injector, inject } from '@angular/core';
import { ContextSerializationStrategyToken } from './serialization-strategy';

@Injectable({
    providedIn: 'root',
})
export class ContextSerializationService {
    private injector = inject(Injector);
    private serializationStrategiesArray = inject(ContextSerializationStrategyToken, { optional: true });

    private serializationStrategies = this.serializationStrategiesArray?.flat() ?? [];

    serialize(value: unknown): string {
        const strategy = this.serializationStrategies
            .map((strategyType) => this.injector.get(strategyType))
            .find((s) => s.canSerialize(value));

        if (!strategy) {
            return String(value);
        }

        return strategy.serialize(value);
    }
}
