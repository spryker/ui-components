import { AbstractType, InjectionToken, Type } from '@angular/core';

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

export type InjectableType<T> = Type<T> | AbstractType<T> | InjectionToken<T>;

export type MapTo<T, E, M> = T extends E ? M : T;

export type AsKeyOf<K, T> = K extends keyof T ? K : never;

export type Prepend<Tuple extends any[], Added> = ((
  _: Added,
  ..._1: Tuple
) => any) extends (..._: infer Result) => any
  ? Result
  : never;

export type Reverse<Tuple extends any[], Prefix extends any[] = []> = {
  0: Prefix;
  1: ((..._: Tuple) => any) extends (_: infer First, ..._1: infer Next) => any
    ? Reverse<Next, Prepend<Prefix, First>>
    : never;
}[Tuple extends [any, ...any[]] ? 1 : 0];
