import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function ToBoolean(): PropertyDecorator {
  return (target, key) => {
    const internalKey = `__${key.toString()}-value`;

    const getter = function(this: any) {
      return this[internalKey];
    };

    const setter = function(this: any, prop: boolean | string) {
      this[internalKey] = coerceBooleanProperty(prop);
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: false,
      configurable: true,
    });
  };
}
