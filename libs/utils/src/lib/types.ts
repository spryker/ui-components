import { InjectionToken } from '@angular/core';

/**
 * Map type `T` to type `M` if it extends type `E`
 */
export type MapType<T, E, M> = { 0: M; 1: never }[T extends E ? 0 : 1];

/**
 * Default type `T` to type `D` if it is of type `never`
 */
export type Default<T, D> = Distribute<T> extends never ? D : T;

/**
 * Apply distribution to type `T`
 *
 * Which means if the type is union (ex. `string | number`) - it will
 * create a tuple for each element from that union (ex. `[string, number]`)
 */
export type Distribute<T> = T extends any ? T : never;

/**
 * Extract stored type from {@link InjectionToken}
 */
export type InjectionTokenType<T> = T extends InjectionToken<infer V>
  ? V
  : never;

/**
 * Represents any function in Javascript
 */
export type AnyFunction<R = any, A extends any[] = any[]> = (...args: A) => R;

/**
 * Represents a function with at least 1 argument
 */
export type FunctionWithArgs<
  R = any,
  A extends [any, ...any[]] = [any]
> = AnyFunction<R, A>;

/**
 * Represents a function without any arguments
 */
export type FunctionWithoutArgs<R = any> = AnyFunction<R, []>;
