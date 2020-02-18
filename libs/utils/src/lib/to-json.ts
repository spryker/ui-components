export const ToJson = () => (
  (target: any, key: string) => {
    const newKey = '__json-value';

    const getter = function(this: any) {
      return this[newKey];
    };

    const setter = function(this: any, prop: Record<string, string> | string) {
      this[newKey] = typeof prop === 'string' ? JSON.parse(prop) : prop;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  }
);
