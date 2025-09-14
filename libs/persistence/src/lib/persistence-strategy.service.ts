import { Injectable, Injector, Type, inject } from '@angular/core';
import { PersistenceStrategyTypesToken } from './token';
import {
    PersistenceStrategy,
    PersistenceStrategyRegistry,
    PersistenceStrategyType,
    PersistenceStrategyTypesDeclaration,
} from './types';

/**
 * Allows to pick specific Persistence Strategy at runtime and get all available strategies registered in DI.
 */
@Injectable({
    providedIn: 'root',
})
export class PersistenceStrategyService {
    private injector = inject(Injector);
    private strategiesTypes = inject(PersistenceStrategyTypesToken, { optional: true });

    private strategies: PersistenceStrategyTypesDeclaration =
        this.strategiesTypes?.reduce((strategies, strategy) => ({ ...strategies, ...strategy }), {}) ?? {};

    select(type: PersistenceStrategyType): PersistenceStrategy {
        if (!this.isPersistenceStrategyRegisteredType(type)) {
            throw Error(`PersistenceStrategyService: Unknown strategy type ${type}`);
        }

        return this.injector.get(this.strategies?.[type]);
    }

    getAll(): PersistenceStrategy[] {
        const strategies = Object.values(this.strategies).map((strategy) =>
            this.injector.get(strategy as Type<PersistenceStrategy>),
        );

        return strategies;
    }

    private isPersistenceStrategyRegisteredType(
        type: PersistenceStrategyType,
    ): type is keyof PersistenceStrategyRegistry {
        return type in this.strategies;
    }
}
