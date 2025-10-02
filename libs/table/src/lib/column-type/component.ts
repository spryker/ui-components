import { Type } from '@angular/core';

export const DefaultConfigData = Symbol('DefaultConfigData');

export function TableColumnTypeComponent<C>(config: Type<C>) {
    return (target: Type<any>) => {
        if (DefaultConfigData in target) {
            target[DefaultConfigData] = config;
        } else {
            Object.defineProperty(target, DefaultConfigData, {
                enumerable: false,
                configurable: true,
                writable: true,
                value: config,
            });
        }

        return target;
    };
}
