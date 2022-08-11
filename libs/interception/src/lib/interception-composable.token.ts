import { InjectionToken, Provider } from '@angular/core';

import { InterceptionComposableFactory } from './types';
import { InterceptionComposerImplementation, InterceptionComposerService } from './interception-composer.service';
import { InterceptionService, InterceptorDispatcherService, InterceptorService } from './interception.service';

export const InterceptionComposableFactoriesToken = new InjectionToken<InterceptionComposableFactory[]>(
    'InterceptionComposableFactories',
);

export const InterceptionComposableToken = new InjectionToken<unknown>('InterceptionComposable');

export function provideInterceptionComposerToken(token: unknown): Provider[] {
    return [
        ...InterceptionComposerProviders,
        {
            provide: InterceptionComposableToken,
            useExisting: token,
        },
    ];
}

export const InterceptionComposerProviders: Provider[] = [
    InterceptionComposerImplementation,
    {
        provide: InterceptionComposerService,
        useExisting: InterceptionComposerImplementation,
    },
];

export function provideInterceptionService(): Provider[] {
    return [
        InterceptionService,
        {
            provide: InterceptorDispatcherService,
            useExisting: InterceptionService,
        },
        { provide: InterceptorService, useExisting: InterceptionService },
    ];
}
