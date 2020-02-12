export type MapType<T, E, M> = { 0: M; 1: never }[T extends E ? 0 : 1];
