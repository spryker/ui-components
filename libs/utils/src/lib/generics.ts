import { AsKeyOf, MapTo } from './types';

export interface Generics<T extends any[] = any[]> {
  __generics: T;
}
export type InferGenerics<T> = T extends Generics<infer G> ? G : never;

export type InferGeneric<T, I> = MapTo<
  InferGenerics<T>[AsKeyOf<I, InferGenerics<T>>],
  undefined,
  never
>;

export type ExtendGenerics<G extends Generics, T extends any[]> = Omit<
  G,
  '__generics'
> &
  Generics<[...G['__generics'], T]>;
