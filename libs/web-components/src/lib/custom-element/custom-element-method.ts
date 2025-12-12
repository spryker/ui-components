const CUSTOM_ELEMENT_METHODS_KEY = Symbol('CUSTOM_ELEMENT_METHODS_KEY');

interface TargetWithMethods extends Record<string, any> {
    [CUSTOM_ELEMENT_METHODS_KEY]: string[];
}

function maybeInitTarget(target: any): asserts target is TargetWithMethods {
    if (target && !Array.isArray(target[CUSTOM_ELEMENT_METHODS_KEY])) {
        target[CUSTOM_ELEMENT_METHODS_KEY] = [];
    }
}

export function CustomElementMethod(): MethodDecorator {
    return (target, propertyKey) => {
        maybeInitTarget(target);
        target[CUSTOM_ELEMENT_METHODS_KEY].push(propertyKey.toString());
    };
}

/** @internal */
export function getElementMethodsOf(component: Partial<TargetWithMethods>) {
    return component[CUSTOM_ELEMENT_METHODS_KEY] || [];
}
