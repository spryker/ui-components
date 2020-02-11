import { Injector } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

import { getElementMethodsOf } from './custom-element-method';
import {
  WebComponentDeclaration,
  WebComponentDeclarationLazy,
  WebComponentDeclarationStatic,
  WebComponentType,
} from './types';
import { isDeclarationLazy } from './util';

export function createCustomElementFor<T extends WebComponentType>(
  componentDeclaration: WebComponentDeclaration<T>,
  injector: Injector,
): NgElementConstructor<T> {
  if (isDeclarationLazy(componentDeclaration)) {
    return createCustomElementForLazy(componentDeclaration, injector);
  } else {
    return createCustomElementForStatic(componentDeclaration, injector);
  }
}

export function createCustomElementForStatic<T extends WebComponentType>(
  componentDeclaration: WebComponentDeclarationStatic<T>,
  injector: Injector,
): NgElementConstructor<T> {
  const componentType = componentDeclaration.component;
  const CustomElementClass = createCustomElement(componentType, { injector });
  const elemMethods = getComponentMethods(componentDeclaration);

  class CustomElement extends (CustomElementClass as any) {
    connectedCallback() {
      super.connectedCallback();
      this.__init();
    }

    private __init() {
      elemMethods.forEach(method => this.__exposeMethod(method));
    }

    private __exposeMethod(method: string) {
      const proto = Object.getPrototypeOf(this);
      const ngComponent = this.ngElementStrategy.componentRef.instance;
      const originalMethod = ngComponent[method];
      const overrideMethod = this[method];

      const externalMethod = overrideMethod || originalMethod;

      ngComponent[method] = externalMethod;
      this[method] = externalMethod;

      // Add original method to prototype only once
      if (typeof proto[method] !== 'function') {
        proto[method] = originalMethod;
      }
    }
  }

  return (CustomElement as any) as NgElementConstructor<T>;
}

export function createCustomElementForLazy<T extends WebComponentType>(
  componentDeclaration: WebComponentDeclarationLazy<T>,
  injector: Injector,
): NgElementConstructor<T> {
  let componentType: NgElementConstructor<T> | undefined;
  let elemMethods: string[] = [];

  async function load() {
    const component = await componentDeclaration.component();
    componentType = createCustomElement(component, { injector });
    elemMethods = getComponentMethods({ ...componentDeclaration, component });
    LazyCustomElement.prototype = componentType.prototype;
  }

  class LazyCustomElement extends (HTMLElement as any) {
    protected __innerType: NgElementConstructor<T> | undefined;
    protected __innerMethods: string[] = [];

    constructor() {
      super();

      if (!componentType) {
        load().then(() => this.__init());
      } else {
        this.__init();
      }
    }

    private __init() {
      componentType!.call(this as any, injector);
      elemMethods.forEach(method => this.__exposeMethod(method.toString()));
    }

    private __exposeMethod(method: string) {
      const proto = Object.getPrototypeOf(this);
      const ngComponent = this.ngElementStrategy.componentRef.instance;
      const originalMethod = ngComponent[method];
      const overrideMethod = this[method];

      const externalMethod = overrideMethod || originalMethod;

      ngComponent[method] = externalMethod;
      this[method] = externalMethod;

      // Add original method to prototype only once
      if (typeof proto[method] !== 'function') {
        proto[method] = originalMethod;
      }
    }
  }

  return (LazyCustomElement as any) as NgElementConstructor<T>;
}

function getComponentMethods(
  componentDeclaration: WebComponentDeclaration,
): string[] {
  const componentProto = componentDeclaration.component.prototype;

  if (!componentDeclaration.exposeAllMethod) {
    return getElementMethodsOf(componentProto);
  }

  return Object.getOwnPropertyNames(componentProto).filter(key => {
    if (key === 'constructor') {
      return false;
    }

    try {
      // If it's a getter - it may fail
      return typeof componentProto[key] === 'function';
    } catch {
      return false;
    }
  });
}
