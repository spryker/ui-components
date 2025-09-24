import deepmerge from 'deepmerge';

export function mergeDeep<T1, T2>(val1: T1, val2: T2): T1 & T2 {
    return deepmerge(val1, val2) as any;
}
