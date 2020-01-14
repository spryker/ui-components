import { Injector } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';

import { getElementMethodsOf } from './custom-element-method';
import {
  WebComponentDeclaration,
  WebComponentDef,
  WebComponentType,
  WebComponentDefs,
} from './types';

export function componentDefsToDeclarations(
  def: WebComponentDefs,
): WebComponentDeclaration[] {
  return [
    ...def.filter(isWebComponentDeclaration),
    ...def.filter(isWebComponentType).map(
      component =>
        ({
          component,
          selector: component.selector,
        } as WebComponentDeclaration),
    ),
  ];
}

export function createCustomElementFor(
  componentDeclaration: WebComponentDeclaration,
  injector: Injector,
) {
  const componentType = componentDeclaration.component;
  const customElement = createCustomElement(componentType, { injector });
  const elemMethods = getComponentMethods(componentDeclaration);

  class CustomElement extends (customElement as any) {
    connectedCallback() {
      super.connectedCallback();
      this.__init();
    }

    private __init() {
      elemMethods.forEach((method: any) => this.__exposeMethod(method));
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

  return (CustomElement as any) as NgElementConstructor<any>;
}

function getComponentMethods(
  componentDeclaration: WebComponentDeclaration,
): (string | symbol)[] {
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

function isWebComponentType(c: WebComponentDef): c is WebComponentType {
  return !!c && typeof c === 'function';
}

function isWebComponentDeclaration(
  c: WebComponentDef,
): c is WebComponentDeclaration {
  return !!c && !!(c as any).component;
}
