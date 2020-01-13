const CUSTOM_ELEMENT_METHODS_KEY = Symbol('CUSTOM_ELEMENT_METHODS_KEY');

interface TargetWithKey extends Object {
  [CUSTOM_ELEMENT_METHODS_KEY]?: (string | symbol)[];
}

export function CustomElementMethod(): MethodDecorator {
  return (target: TargetWithKey, propertyKey) => {
    if (!Array.isArray(target[CUSTOM_ELEMENT_METHODS_KEY])) {
      target[CUSTOM_ELEMENT_METHODS_KEY] = [];
    }

    target[CUSTOM_ELEMENT_METHODS_KEY].push(propertyKey);
  };
}

/** @internal */
export function getElementMethodsOf(component: TargetWithKey) {
  return component[CUSTOM_ELEMENT_METHODS_KEY] || [];
}
