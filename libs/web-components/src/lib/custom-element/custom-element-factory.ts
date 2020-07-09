import { Injector } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { CrossBoundaryNgElementStrategyFactory } from 'ngx-element-boundary';
import { DefaultElementBoundaryNgElementStrategyFactory } from 'ngx-element-boundary/element-strategy/default';

import { NgWebComponent } from '../ng-web-component';
import { getElementMethodsOf } from './custom-element-method';
import {
  WebComponentDeclaration,
  WebComponentDeclarationLazy,
  WebComponentDeclarationStatic,
  WebComponentType,
} from './types';
import { exposeMethod, isDeclarationLazy } from './util';

export function createCustomElementFor<T>(
  componentDeclaration: WebComponentDeclaration<WebComponentType<T>>,
  injector: Injector,
): NgWebComponent<T> {
  if (isDeclarationLazy(componentDeclaration)) {
    return createCustomElementForLazy(componentDeclaration, injector);
  }

  return createCustomElementForStatic(
    componentDeclaration as WebComponentDeclarationStatic<WebComponentType<T>>,
    injector,
  );
}

export function createCustomElementForStatic<T>(
  componentDeclaration: WebComponentDeclarationStatic<WebComponentType<T>>,
  injector: Injector,
): NgWebComponent<T> {
  const componentType = componentDeclaration.component;

  const defaultStrategyFactory = new DefaultElementBoundaryNgElementStrategyFactory(
    componentType,
    injector,
  );

  const strategyFactory = new CrossBoundaryNgElementStrategyFactory(
    defaultStrategyFactory,
    { isRoot: componentDeclaration.isRoot },
  );

  const NgElement = createCustomElement(componentType, {
    injector,
    strategyFactory,
  });
  const elemMethods = getComponentMethods(componentDeclaration);

  class WebComponent extends (NgElement as any) implements NgWebComponent<any> {
    private __inited = 0;
    private ngComponent: any;

    getNgType() {
      return componentType;
    }

    getSuper() {
      return this.ngComponent;
    }

    connectedCallback() {
      super.connectedCallback();

      // When there is no {@link ComponentRef} - it means that the component
      // was either moved or has been destroyed already
      if (!this.ngElementStrategy.componentRef) {
        return;
      }

      this.ngComponent = this.ngElementStrategy.componentRef.instance;
      this.__init();
    }

    private __init() {
      if (this.__inited++) {
        return;
      }

      elemMethods.forEach(method =>
        exposeMethod(
          this,
          this.ngComponent,
          method,
          Object.getPrototypeOf(this),
        ),
      );
    }
  }

  return (WebComponent as any) as NgWebComponent<T>;
}

export function createCustomElementForLazy<T>(
  componentDeclaration: WebComponentDeclarationLazy<WebComponentType<T>>,
  injector: Injector,
): NgWebComponent<T> {
  let componentType: NgElementConstructor<T> | undefined;
  let elemMethods: string[] = [];

  async function load() {
    const component = await componentDeclaration.component();
    componentType = createCustomElement(component, { injector });
    elemMethods = getComponentMethods({ ...componentDeclaration, component });
    LazyWebComponent.prototype = componentType.prototype;
    return componentType;
  }

  class LazyWebComponent extends (HTMLElement as any)
    implements NgWebComponent<any> {
    private ngComponent: any;

    constructor() {
      super();

      if (!componentType) {
        load().then(type => this.__init(type));
      } else {
        this.__init(componentType);
      }
    }

    getNgType() {
      return componentType;
    }

    getSuper() {
      return this.ngComponent;
    }

    private __init(type: NgElementConstructor<T>) {
      type.call(this as any, injector);

      this.ngComponent = this.ngElementStrategy.componentRef.instance;

      elemMethods.forEach(method =>
        exposeMethod(
          this,
          this.ngComponent,
          method,
          Object.getPrototypeOf(this),
        ),
      );
    }
  }

  return (LazyWebComponent as any) as NgWebComponent<T>;
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
