import { isNull } from 'util';

export function ToJson(): PropertyDecorator {
  return (target, key) => {
    const internalKey = `__${key.toString()}-value`;

    const getter = function(this: any) {
      return this[internalKey];
    };

    const setter = function(
      this: any,
      prop: Record<string, string> | string | number,
    ) {
      if (!prop && prop !== 0) {
        this[internalKey] = undefined;

        return;
      }

      try {
        this[internalKey] = typeof prop === 'string' ? JSON.parse(prop) : prop;
      } catch (error) {
        this[internalKey] = prop;
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
