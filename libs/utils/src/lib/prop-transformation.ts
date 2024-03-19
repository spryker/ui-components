import { MapType } from './types';

export interface TemplateIndexSignature {
    [key: string]: {
        [key: string]: string;
    };
}

export const propsTransformation = <
    T extends TemplateIndexSignature & Object,
    K extends keyof T,
    K2 extends keyof T[K],
    K2_NEW extends string,
>(
    template: T,
    prop: K2 | K2_NEW,
    propName: K,
):
    | Exclude<T[K][K2], 'null'>
    | Exclude<K2, keyof T[K]>
    | Exclude<K2_NEW, keyof T[K]>
    | MapType<T[K][K2], 'null', null> => {
    const propValue = template?.[propName]?.[prop] ?? prop;

    return propValue === 'null' ? null : (propValue as any);
};
