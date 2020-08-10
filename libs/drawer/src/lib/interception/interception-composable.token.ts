import { InjectionToken } from '@angular/core';

import { InterceptionComposableFactory } from './types';

export const InterceptionComposableFactoriesToken = new InjectionToken<
  InterceptionComposableFactory[]
>('InterceptionComposableFactories');

export const InterceptionComposableToken = new InjectionToken<unknown>(
  'InterceptionComposable',
);
