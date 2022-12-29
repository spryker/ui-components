import { CommonModule } from '@angular/common';
import { NgModule, Type, ModuleWithProviders } from '@angular/core';

import { InterceptionComposerDirective } from './interception-composer.directive';
import { InterceptionComposableFactory } from './types';
import { InterceptionComposableFactoriesToken } from './interception-composable.token';

@NgModule({
    imports: [CommonModule],
    declarations: [InterceptionComposerDirective],
})
export class InterceptionModule {
    static withComposable(factory: Type<InterceptionComposableFactory>): ModuleWithProviders<InterceptionModule> {
        return {
            ngModule: InterceptionModule,
            providers: [
                {
                    provide: InterceptionComposableFactoriesToken,
                    useClass: factory,
                    multi: true,
                },
            ],
        };
    }
}
