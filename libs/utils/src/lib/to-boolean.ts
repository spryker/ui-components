import { coerceBooleanProperty } from '@angular/cdk/coercion';

export function ToBoolean() {
  return (target: Object, key: string, descriptor?: any) => {
    if (descriptor) {
      const originalSet = descriptor.set;

      descriptor.set = function(value: boolean | string) {
        return originalSet.call(this, coerceBooleanProperty(value));
      };

      return descriptor;
    }

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
