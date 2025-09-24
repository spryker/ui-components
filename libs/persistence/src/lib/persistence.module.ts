import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { providePersistenceStrategies } from './token';
import { PersistenceStrategyTypesDeclaration } from './types';

@NgModule({
    imports: [CommonModule],
})
export class PersistenceModule {
    static withStrategies(strategies: PersistenceStrategyTypesDeclaration): ModuleWithProviders<PersistenceModule> {
        return {
            ngModule: PersistenceModule,
            providers: [providePersistenceStrategies(strategies)],
        };
    }
}
