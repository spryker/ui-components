import { Type } from '@angular/core';
import { Default, AsKeyOf } from './types';

export type RegistryType<R> = Default<keyof R, string>;

export type GetFromRegistry<T, R, D = never> = Default<R[AsKeyOf<T, R>], D>;

export type GetRegistryKey<V, I extends keyof V> = V[I];

export type RegistryDeclaration<R> = { [P in keyof R]: Type<R[P]> };
