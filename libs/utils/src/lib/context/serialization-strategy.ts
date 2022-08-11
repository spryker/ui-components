import { InjectionToken, Type, Provider } from '@angular/core';

export const ContextSerializationStrategyToken = new InjectionToken<Type<ContextSerializationStrategy>[][]>(
    'ContextSerializationStrategy',
);

export interface ContextSerializationStrategy<T = unknown> {
    serialize(value: T): string;
    canSerialize(value: unknown): value is T;
}

export function provideContextSerializationStrategies(strategies: Type<ContextSerializationStrategy>[]): Provider {
    return {
        provide: ContextSerializationStrategyToken,
        useValue: strategies,
        multi: true,
    };
}
