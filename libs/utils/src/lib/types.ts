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
