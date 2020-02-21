export function ToJson(): PropertyDecorator {
  return (target, key) => {
    const newKey = '__json-value';

    const getter = function(this: any) {
      return this[newKey];
    };

    const setter = function(this: any, prop: Record<string, string> | string) {
      if (!prop) {
        this[newKey] = undefined;
      } else {
        this[newKey] = typeof prop === 'string' ? JSON.parse(prop) : prop;
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
