import { Type } from '@angular/core';

/**
 * Helper for typecasting objects.
 *
 * NOTE: It does not perform any runtime checks -only AOT type adjustments
 */
export function as<T>(val: unknown): asserts val is Partial<T> {}

export type InferType<T> = T extends Type<infer V> ? V : never;
